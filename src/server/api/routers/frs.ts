import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';

export const frsRouter = createTRPCRouter({
  createPlan: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        semester: z.number().min(1).max(8),
        matkul: z
          .string()
          .array()
          .refine((e) => new Set(e).size === e.length, {
            message: 'Class cant be duplicate',
          }),
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
            in: input.matkul.map((item) => item),
          },
        },
      });
      // check total sks
      const totalSks = classes.reduce((acc, curr) => acc + curr.Matkul.sks, 0);
      if (totalSks < 18) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Total SKS tidak boleh kurang dari 18',
        });
      } else if (totalSks > 24) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Total SKS tidak boleh lebih dari 24',
        });
      }

      const result = await prisma.plan.create({
        data: {
          title: input.title,
          semester: input.semester,
          userId: input.userId,
          totalSks: totalSks,
          Class: {
            connect: input.matkul.map((item) => ({
              id: item,
            })),
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
