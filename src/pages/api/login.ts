/* eslint-disable no-case-declarations */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/server/db';

import { env } from '@/env.mjs';

import { APIResponse } from '@/types/api';

const KEY = env.NEXTAUTH_SECRET as string;

export type LoginResponseData = {
  username: string;
  email: string;
  accessToken: string;
  id: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<LoginResponseData>>,
) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(400).json({
      status: 'error',
      message: 'Method not implemented',
    });
    return;
  }

  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      status: 'error',
      message: 'Request missing username or password',
    });
    return;
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
    res.status(401).json({
      status: 'error',
      message: 'User tidak ditemukan',
    });
    return;
  }
  const user = users[0];
  if (!user) {
    res.status(401).json({
      status: 'error',
      message: 'User tidak ditemukan',
    });
    return;
  }

  const userId = user.id,
    userEmail = user.email,
    userPassword = user.password,
    userUsername = user.username;

  const isMatch = await bcrypt.compare(password, userPassword);
  if (!isMatch) {
    res.status(400).json({
      status: 'error',
      message: 'Password incorrect',
    });
    return;
  }
  const payload = {
    id: userId,
    username: userUsername,
    email: userEmail,
  };
  try {
    const token = jwt.sign(payload, KEY, { expiresIn: '1d' });
    res.status(200).json({
      status: 'success',
      message: 'User successfully logged in',
      data: {
        id: userId,
        username: userUsername,
        email: userEmail,
        accessToken: token as string,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: 'error',
      message: 'ERROR SIGN TOKEN',
    });
  }
  return;
}
