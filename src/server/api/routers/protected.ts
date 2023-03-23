import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';

export const protectedRouter = createTRPCRouter({
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
    .input(
      z.object({
        id: z.string().nonempty(),
        fullname: z.string().optional(),
        username: z.string().min(6).max(12).nonempty(),
        email: z.string().email().nonempty(),
        idLine: z.string().optional(),
        whatsapp: z.string(),
      })
    )
    .mutation(({ input }) => {
      const updatedProfile = prisma.user
        .update({
          where: {
            id: input.id,
          },
          data: {
            fullname: input.fullname,
            username: input.username,
            email: input.email,
            idLine: input.idLine,
            whatsapp: input.whatsapp,
          },
        })
        .then((res) => res.id);

      return updatedProfile;
    }),
});
