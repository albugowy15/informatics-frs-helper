/* eslint-disable no-case-declarations */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { APIResponse } from '@/types/api';

const KEY = 'secretKeynyaini';
const USERS = [
  {
    id: '425452664242',
    email: 'kholidbughowi@gmail.com',
    username: 'albugowy15',
    password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq',
  },
];

type LoginResponseData = {
  username: string;
  email: string;
  accessToken: string;
  id: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<LoginResponseData>>
) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        const { username, password } = req.body;
        if (!username || !password) {
          res.status(400).json({
            status: 'error',
            message: 'Request missing username or password',
          });
        }

        const user = USERS.find((user) => {
          return user.username === username;
        });

        if (!user) {
          res.status(401).json({
            status: 'error',
            message: 'User not found',
          });
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

              jwt.sign(payload, KEY, { expiresIn: 31556926 }, (err, token) => {
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
              });
            } else {
              res.status(400).json({
                status: 'error',
                message: 'Password incorrect',
              });
            }
          });
        }
        break;
      case 'GET':
        res.status(405).json({
          status: 'error',
          message: 'Method not allowed',
        });
        break;
      default:
        res.status(405).json({
          status: 'error',
          message: 'Method not allowed',
        });
        break;
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
