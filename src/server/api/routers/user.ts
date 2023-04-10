import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';

import { EditProfileForm } from '@/pages/profile/edit/[userId]';

export const userRouter = createTRPCRouter({
  getUserProfile: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(({ input }) => {
      const userProfile = prisma.user
        .findUnique({
          where: { id: input.id },
        })
        .then((user) => {
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        });

      return userProfile;
    }),
  updateProfile: protectedProcedure
    .input(z.object({ id: z.string(), content: EditProfileForm }))
    .mutation(({ input }) => {
      const updatedProfile = prisma.user
        .update({
          where: {
            id: input.id,
          },
          data: {
            fullname: input.content.fullname,
            username: input.content.username,
            email: input.content.email,
            idLine: input.content.idLine,
            whatsapp: input.content.whatsapp,
          },
        })
        .then((res) => res.id);

      return updatedProfile;
    }),
  changePassword: protectedProcedure
    .input(
      z.object({
        old_password: z.string({
          required_error: 'Password lama tidak boleh kosong',
        }),
        new_password: z
          .string({ required_error: 'Password baru tidak boleh kosong' })
          .min(8)
          .max(16),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const oldPassword = await prisma.user.findUnique({
        select: {
          password: true,
        },
        where: {
          id: input.userId,
        },
      });

      if (!oldPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Password lama salah',
        });
      }

      const match = await bcrypt.compare(
        input.old_password,
        oldPassword.password
      );

      if (!match) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Password lama salah',
        });
      }

      const hashNewPassword = await bcrypt.hash(input.new_password, 10);
      const changePassword = await prisma.user.update({
        select: {
          id: true,
        },
        where: {
          id: input.userId,
        },
        data: {
          password: hashNewPassword,
        },
      });

      return changePassword;
    }),
});
