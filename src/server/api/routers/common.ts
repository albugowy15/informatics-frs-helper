import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const commonRouter = createTRPCRouter({
  getClassBySubject: publicProcedure
    .input(
      z.object({
        subjectId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const classes = await prisma.class.findMany({
        select: {
          id: true,
          code: true,
        },
        where: {
          Matkul: {
            id: input.subjectId,
          },
        },
        orderBy: {
          code: "asc",
        },
      });

      return classes;
    }),
  getClass: publicProcedure
    .input(
      z.object({
        semester: z.number().optional(),
        matkul: z.string().optional(),
        with_taken: z.boolean().optional(),
      }),
    )
    .query(async ({ input }) => {
      const matkul = await prisma.matkul.findMany({
        where: {
          semester: input.semester,
          name: input.matkul,
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
              code: "asc",
            },
          },
        },
        orderBy: {
          name: "asc",
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
      const listSubject = await prisma.matkul.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          semester: input.semester,
        },
        orderBy: {
          name: "asc",
        },
      });

      if (input.withAll == true) {
        listSubject.unshift({ id: "", name: "Semua" });
      }
      return listSubject;
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
        taken: "desc",
      },
      take: 12,
    });

    return classes;
  }),
});
