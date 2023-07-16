import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/server/db';

import { APIResponse } from '@/types/api';

type RegisterResponseData = {
  id: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<RegisterResponseData>>
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
      message: 'Password and confirm password do not match',
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
      message: 'User successfully registered',
      data: {
        id: user.id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Username already exists',
    });
  }
  return;
}
