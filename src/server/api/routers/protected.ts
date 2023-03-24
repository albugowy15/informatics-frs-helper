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
  createPlan: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        semester: z.number(),
        matkul: z.array(z.object({ id: z.string() })),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const classes = await prisma.class.findMany({
        select: {
          Matkul: {
            select: {
              sks: true,
            },
          },
        },
        where: {
          id: {
            in: input.matkul.map((matkul) => matkul.id),
          },
        },
      });
      const totalSks = classes.reduce((acc, curr) => acc + curr.Matkul.sks, 0);
      const result = await prisma.plan.create({
        data: {
          title: input.title,
          semester: input.semester,
          userId: input.userId,
          totalSks: totalSks,
          Class: {
            connect: input.matkul,
          },
        },
      });

      return {
        id: result.id,
      };
    }),

  getAllPlans: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const plans = await prisma.plan.findMany({
        select: {
          id: true,
          title: true,
          semester: true,
          totalSks: true,
        },
        where: {
          userId: input.userId,
        },
      });
      return plans;
    }),
});
