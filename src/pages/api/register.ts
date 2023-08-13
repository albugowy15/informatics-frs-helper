import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/server/db';

import { APIResponse } from '@/types/api';

type RegisterResponseData = {
  id: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<RegisterResponseData>>,
) {
  const { method } = req;
  if (method !== 'POST') {
    res.status(405).json({
      status: 'error',
      message: 'Request method not allowed',
    });
    return;
  }
  const { username, password, email, confirmPassword } = req.body;

  // check if password and confirm password match
  if (password !== confirmPassword) {
    res.status(400).json({
      status: 'error',
      message: 'Password dan konfirmasi password tidak sama',
    });
    return;
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

    res.status(201).json({
      status: 'success',
      message: 'Berhasil membuat akun',
      data: {
        id: user.id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Username atau email telah digunakan',
    });
  }
  return;
}
