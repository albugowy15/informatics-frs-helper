import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import prisma from "@/server/db";

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
      return await prisma.class.findMany({
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
      return await prisma.matkul.findMany({
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
              Lecturer: {
                select: { code: true, fullname: true, id: true },
              },
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
      return input.withAll === true
        ? [{ id: "", name: "Semua" }, ...listSubject]
        : listSubject;
    }),
  getTrendingClasses: publicProcedure.query(async () => {
    return await prisma.class.findMany({
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
  }),
  getStatistic: publicProcedure.query(async () => {
    const [totalClasses, totalUsers, totalPlans, totalTrades, frsBySemester] =
      await Promise.all([
        prisma.class.count(),
        prisma.user.count(),
        prisma.plan.count(),
        prisma.tradeMatkul.count(),
        prisma.plan
          .groupBy({
            by: "semester",
            orderBy: {
              semester: "asc",
            },
            _count: true,
          })
          .then((val) =>
            val.map((item) => ({ key: item.semester, value: item._count })),
          ),
      ]);

    const statistic: StatisticData[] = [
      {
        id: crypto.randomUUID(),
        title: "Total Kelas",
        value: totalClasses,
        type: "class",
        description: "Kelas dapat diambil",
      },
      {
        id: crypto.randomUUID(),
        title: "Total User",
        value: totalUsers,
        type: "user",
        description: "User terdaftar",
      },
      {
        id: crypto.randomUUID(),
        title: "Total Plan FRS",
        value: totalPlans,
        type: "frs",
        description: "Rencana FRS dibuat",
      },
      {
        id: crypto.randomUUID(),
        title: "Total Trade Kelas",
        value: totalTrades,
        type: "trade",
        description: "Post Trade Kelas dibuat",
      },
    ];

    return { statistic, frsBySemester };
  }),
});
