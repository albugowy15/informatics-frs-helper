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
  if (method === 'POST') {
    const { username, password, email } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
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
      res.status(400).json({
        status: 'error',
        message: 'User already exists',
      });
    }
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Request method not allowed',
    });
  }
  return;
}
