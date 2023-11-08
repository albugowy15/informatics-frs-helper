import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

import { prisma } from "@/server/db";

import { env } from "@/env.mjs";

const KEY = env.NEXTAUTH_SECRET!;

export interface LoginResponseData {
  username: string;
  email: string;
  accessToken: string;
  id: string;
}

const handler = async (req: NextRequest) => {
  const data = (await req.json()) as { username: string; password: string };

  const { username, password } = data;
  if (!username || !password) {
    return NextResponse.json(
      { status: "error", message: "Username dan password kosong" },
      { status: 400 },
    );
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: username,
        },
        {
          email: username,
        },
      ],
    },
  });

  if (users.length === 0 || users.length > 1) {
    return NextResponse.json(
      {
        status: "error",
        message: "User tidak ditemukan",
      },
      {
        status: 401,
      },
    );
  }
  const user = users[0];
  if (!user) {
    return NextResponse.json(
      {
        status: "error",
        message: "User tidak ditemukan",
      },
      {
        status: 401,
      },
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      {
        status: "error",
        message: "Password salah",
      },
      {
        status: 400,
      },
    );
  }
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  try {
    const token = jwt.sign(payload, KEY, { expiresIn: "1d" });
    return NextResponse.json(
      {
        status: "success",
        message: "User successfully logged in",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token,
        },
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    return NextResponse.json(
      {
        status: "error",
        message: "ERROR SIGN TOKEN",
      },
      {
        status: 500,
      },
    );
  }
};

export { handler as POST };
