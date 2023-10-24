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
      }),
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
          orderBy: {
            code: 'asc',
          },
        })
        .then((res) => res.map((item) => item.code));

      return classes;
    }),
  getClass: publicProcedure
    .input(
      z.object({
        semester: z.number().min(1).max(8),
        matkul: z.string().optional(),
        with_taken: z.boolean().optional(),
      }),
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
          id: true,
          name: true,
          semester: true,
          sks: true,
          Class: {
            select: {
              code: true,
              day: true,
              id: true,
              Lecturer: { select: { code: true, fullname: true, id: true } },
              Session: {
                select: { session_time: true },
              },
              taken: input.with_taken ? input.with_taken : false,
            },
            orderBy: {
              code: 'asc',
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      return matkul;
    }),
  getSubject: publicProcedure
    .input(
      z.object({
        semester: z.number().min(1).max(8),
        withAll: z.boolean().optional(),
      }),
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
          orderBy: {
            name: 'asc',
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
  getSubjectMappedWithSemester: publicProcedure.query(async () => {
    const subjects = await prisma.matkul.findMany({
      select: {
        name: true,
        semester: true,
      },
      orderBy: {
        semester: 'asc',
      },
    });
    const semesterToSubjectMap: { [key: number]: string[] } = subjects.reduce(
      (result, subject) => {
        const { name, semester } = subject;
        if (!result[semester]) {
          result[semester] = [];
        }
        result[semester]?.push(name);
        return result;
      },
      {} as { [key: number]: string[] },
    );
    return semesterToSubjectMap;
  }),
  getClassOptions: publicProcedure.query(async () => {
    const listSemester = [
      { id: 1, semester: 1 },
      { id: 2, semester: 2 },
      { id: 3, semester: 3 },
      { id: 4, semester: 4 },
      { id: 5, semester: 5 },
      { id: 6, semester: 6 },
      { id: 7, semester: 7 },
      { id: 8, semester: 8 },
    ];

    const listSubject = await prisma.matkul
      .findMany({
        select: {
          id: true,
          name: true,
          semester: true,
        },
        orderBy: {
          name: 'asc',
        },
      })
      .then((res) => {
        return res.map((item) => {
          return {
            id: item.id,
            matkul: item.name,
            semesterId: item.semester,
          };
        });
      });

    const listClass = await prisma.class
      .findMany({
        select: {
          id: true,
          code: true,
          matkulId: true,
        },
        orderBy: {
          code: 'asc',
        },
      })
      .then((res) => {
        return res.map((item) => {
          return {
            id: item.id,
            class: item.code,
            matkulId: item.matkulId,
          };
        });
      });

    return {
      listSemester,
      listSubject,
      listClass,
    };
  }),
  getTrendingClasses: publicProcedure.query(async () => {
    const classes = await prisma.class.findMany({
      select: {
        code: true,
        day: true,
        id: true,
        Lecturer: { select: { fullname: true, id: true } },
        Matkul: { select: { name: true, id: true, sks: true } },
        Session: {
          select: { session_time: true },
        },
        taken: true,
      },
      where: {
        taken: {
          gt: 10,
        },
      },
      orderBy: {
        taken: 'desc',
      },
      take: 10,
    });

    return classes;
  }),
});
