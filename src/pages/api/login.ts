/* eslint-disable no-case-declarations */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/server/db';

import { APIResponse } from '@/types/api';

const KEY = process.env.NEXTAUTH_SECRET as string;

export type LoginResponseData = {
  username: string;
  email: string;
  accessToken: string;
  id: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<LoginResponseData>>
) {
  const { method } = req;
  if (method === 'POST') {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        status: 'error',
        message: 'Request missing username or password',
      });
    }

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    if (user) {
      const userId = user.id,
        userEmail = user.email,
        userPassword = user.password,
        userUsername = user.username;

      bcrypt.compare(password, userPassword).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: userId,
            username: userUsername,
            email: userEmail,
          };

          jwt.sign(payload, KEY, { expiresIn: '1d' }, (_err, token) => {
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
            return;
          });
        } else {
          res.status(400).json({
            status: 'error',
            message: 'Password incorrect',
          });
          return;
        }
      });
    }
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Method not implemented',
    });
    return;
  }
  return;
}
