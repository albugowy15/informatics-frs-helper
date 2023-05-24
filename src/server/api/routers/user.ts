import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';

import { EditProfileForm } from '@/pages/profile/edit/[userId]';

export const userRouter = createTRPCRouter({
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const userProfile = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        email: true,
        fullname: true,
        idLine: true,
        username: true,
        whatsapp: true,
      },
    });

    if (!userProfile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User tidak ditemukan',
      });
    }

    return userProfile;
  }),
  updateProfile: protectedProcedure
    .input(z.object({ content: EditProfileForm }))
    .mutation(({ input, ctx }) => {
      const updatedProfile = prisma.user
        .update({
          where: {
            id: ctx.session.user.id,
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
      })
    )
    .mutation(async ({ input, ctx }) => {
      const oldPassword = await prisma.user.findUnique({
        select: {
          password: true,
        },
        where: {
          id: ctx.session.user.id,
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
          id: ctx.session.user.id,
        },
        data: {
          password: hashNewPassword,
        },
      });

      return changePassword;
    }),
});
