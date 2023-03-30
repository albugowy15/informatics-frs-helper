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
  getTradeMatkul: publicProcedure
    .input(
      z.object({
        semester: z.number().min(1).max(8).optional(),
        matkul: z.string().optional(),
      })
    )
    .query(({ input }) => {
      const tradeMatkulPosts = prisma.tradeMatkul.findMany({
        include: {
          hasMatkul: {
            select: {
              code: true,
              Matkul: {
                select: {
                  name: true,
                  semester: true,
                },
              },
            },
          },
          searchMatkul: {
            select: {
              code: true,
              Matkul: {
                select: {
                  name: true,
                  semester: true,
                },
              },
            },
          },
          User: {
            select: {
              username: true,
              fullname: true,
              idLine: true,
              whatsapp: true,
            },
          },
        },
        where: {
          hasMatkul: {
            Matkul: {
              semester: input.semester ?? undefined,
              name:
                input.matkul === '' || input.matkul === 'Semua'
                  ? undefined
                  : input.matkul,
            },
          },
        },
      });

      return tradeMatkulPosts;
    }),
});
