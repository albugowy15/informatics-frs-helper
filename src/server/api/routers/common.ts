import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { prisma } from '@/server/db';

export const commonRouter = createTRPCRouter({
  getClassByMatkul: protectedProcedure
    .input(
      z.object({
        matkulName: z.string(),
      })
    )
    .query(({ input }) => {
      const classes = prisma.class
        .findMany({
          select: {
            code: true,
          },
          where: {
            Matkul: {
              name: {
                equals: input.matkulName,
              },
            },
          },
        })
        .then((res) => res.map((item) => item.code));

      return classes;
    }),
  getClass: publicProcedure
    .input(
      z.object({
        semester: z.number().min(1).max(6),
        matkul: z.string().optional(),
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
          },
        },
      });

      return matkul;
    }),
  getSubject: publicProcedure
    .input(
      z.object({
        semester: z.number().min(1).max(6),
        withAll: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {
      const listSubject = prisma.matkul
        .findMany({
          select: {
            name: true,
          },
          where: {
            semester: input.semester,
          },
        })
        .then((res) => {
          return res.map((item) => item.name);
        });

      if (input.withAll == true) {
        (await listSubject).unshift('Semua');
      }
      return listSubject;
    }),
});
