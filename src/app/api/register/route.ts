import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/server/db';

const handler = async (req: NextRequest) => {
  const data = await req.json();
  const { username, password, email, confirmPassword } = data;

  // check if password and confirm password match
  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Password dan konfirmasi password tidak sama',
      },
      {
        status: 400,
      },
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'Berhasil membuat akun',
        data: {
          id: user.id,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Username atau email telah digunakan',
      },
      { status: 400 },
    );
  }
};

export { handler as POST };
