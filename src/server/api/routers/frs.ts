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
            message: 'Tidak boleh mengambil kelas yang sama',
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

      // perform some checks
      //1. check total sks
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

      //2. check total plan
      const totalPlan = await prisma.plan.count({
        where: {
          userId: input.userId,
        },
      });

      if (totalPlan == 3) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Telah mencapai batas plan yang dapat dibuat',
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
  updatePlan: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
        data: z.object({
          title: z.string(),
          semester: z.number().min(1).max(8),
          matkul: z
            .string()
            .array()
            .refine((e) => new Set(e).size === e.length, {
              message: 'Tidak boleh mengambil kelas yang sama',
            }),
          userId: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      // check plan Id
      const returnedPlanId = await prisma.plan.findUnique({
        select: {
          id: true,
        },
        where: {
          id: input.planId,
        },
      });

      if (returnedPlanId == null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Rencana FRS tidak ditemukan',
        });
      }

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
            in: input.data.matkul.map((item) => item),
          },
        },
      });

      // perform some checks
      //1. check total sks
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

      const updatedPlan = await prisma.plan.update({
        select: {
          id: true,
        },
        where: {
          id: returnedPlanId.id,
        },
        data: {
          title: input.data.title,
          semester: input.data.semester,
          userId: input.data.userId,
          totalSks: totalSks,
          Class: {
            set: input.data.matkul.map((item) => ({
              id: item,
            })),
          },
        },
      });

      return updatedPlan;
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
  getPlanDetail: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const classTaken = await prisma.plan.findUnique({
        select: {
          id: true,
          semester: true,
          title: true,
          totalSks: true,
          Class: {
            select: {
              code: true,
              day: true,
              id: true,
              Lecturer: {
                select: {
                  id: true,
                  fullname: true,
                },
              },
              Session: {
                select: {
                  session_time: true,
                },
              },
              Matkul: {
                select: {
                  id: true,
                  name: true,
                  semester: true,
                  sks: true,
                },
              },
            },
          },
        },
        where: {
          id: input.planId,
        },
      });

      if (classTaken == null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Rencana FRS Tidak Ditemukan',
        });
      }

      return classTaken;
    }),
  deletePlan: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const deletedPlan = await prisma.plan.delete({
        select: {
          id: true,
        },
        where: {
          id: input.planId,
        },
      });

      if (deletedPlan == undefined) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Rencana FRS Tidak Ditemukan',
        });
      }

      return deletedPlan;
    }),
});
