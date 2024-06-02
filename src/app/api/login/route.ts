import { loginSchema } from "@/app/login/schema";
import prisma from "@/server/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const parsedData = loginSchema.safeParse(reqBody);
    if (!parsedData.success) {
      return Response.json({ msg: "bad-credentials" }, { status: 400 });
    }

    if (!parsedData.data.username || !parsedData.data.password) {
      return Response.json({ msg: "empty-credentials" }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: parsedData.data.username,
          },
          {
            email: parsedData.data.username,
          },
        ],
      },
    });
    if (users.length === 0 || users.length > 1) {
      return Response.json({ msg: "invalid-username" }, { status: 400 });
    }
    const user = users[0];
    if (!user) {
      return Response.json({ msg: "invalid-credentials" }, { status: 400 });
    }
    const isMatch = await bcrypt.compare(
      parsedData.data.password,
      user.password,
    );
    if (!isMatch) {
      return Response.json({ msg: "invalid-credentials" }, { status: 400 });
    }
    return Response.json(
      {
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      },
      { status: 200 },
    );
  } catch (e) {
    console.error("/api/login error:", e);
    return Response.json(
      {
        msg: "unknown",
      },
      { status: 500 },
    );
  }
}
