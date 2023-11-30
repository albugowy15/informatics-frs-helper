import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export interface StatisticData {
  id: string;
  title: string;
  value: number;
  type: "user" | "frs" | "trade" | "class";
  description: string;
}

export interface FrsBySemester {
  key: number;
  value: number;
}

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
  getStatistic: publicProcedure.query(async () => {
    const statistic: StatisticData[] = [
      {
        id: crypto.randomUUID(),
        title: "Total Kelas",
        value: await prisma.class.count(),
        type: "class",
        description: "Kelas dapat diambil",
      },
      {
        id: crypto.randomUUID(),
        title: "Total User",
        value: await prisma.user.count(),
        type: "user",
        description: "User terdaftar",
      },
      {
        id: crypto.randomUUID(),
        title: "Total Plan FRS",
        value: await prisma.plan.count(),
        type: "frs",
        description: "Rencana FRS dibuat",
      },
      {
        id: crypto.randomUUID(),
        title: "Total Trade Kelas",
        value: await prisma.tradeMatkul.count(),
        type: "trade",
        description: "Post Trade Kelas dibuat",
      },
    ];

    const frsBySemester = await prisma.plan
      .groupBy({
        by: "semester",
        orderBy: {
          semester: "asc",
        },
        _count: true,
      })
      .then((val) =>
        val.map((item) => ({ key: item.semester, value: item._count })),
      );

    return { statistic, frsBySemester };
  }),
});
