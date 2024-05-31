import prisma from "@/server/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const data = (await req.json()) as { username: string; password: string };
  if (!data.username || !data.password) {
    return Response.json(
      { msg: "Username dan password wajib diisi" },
      { status: 400 },
    );
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: data.username,
        },
        {
          email: data.username,
        },
      ],
    },
  });
  if (users.length === 0 || users.length > 1) {
    return Response.json({ msg: "User tidak ditemukan" }, { status: 400 });
  }
  const user = users[0];
  if (!user) {
    return Response.json({ msg: "User tidak ditemukan" }, { status: 400 });
  }
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    return Response.json({ msg: "Password salah" }, { status: 400 });
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
}
