import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';

export const publicRouter = createTRPCRouter({
  getClass: publicProcedure
    .input(
      z.object({
        semester: z.number().min(1).max(6),
        matkul: z.string().optional(),
        isAksel: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const matkul = await prisma.matkul.findMany({
        where: {
          semester: input.semester,
          name:
            input.matkul === '' || input.matkul === 'Semua'
              ? undefined
              : input.matkul,
        },
        select: {
          name: true,
          semester: true,
          sks: true,
          Class: {
            select: {
              code: true,
              day: true,
              id: true,
              Lecturer: { select: { code: true, fullname: true } },
              Session: {
                select: { session_time: true },
              },
            },
            where: {
              isAksel: input.isAksel,
            },
          },
        },
      });

      return matkul;
    }),
});
