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
    .mutation(async ({ input, ctx }) => {
      if (input.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Tidak dapat membuat plan FRS',
        });
      }

      const classes = await prisma.class.findMany({
        select: {
          Matkul: {
            select: {
              sks: true,
            },
          },
          taken: true,
          day: true,
          sessionId: true,
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

      //2. check class schedule conflict from inputed classes
      const scheduleConflict = classes.some((item1, index1) => {
        return classes.some((item2, index2) => {
          if (index1 !== index2) {
            return (
              item1.day === item2.day && item1.sessionId === item2.sessionId
            );
          }
          return false;
        });
      });

      if (scheduleConflict) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Terdapat kelas dengan jadwal yang sama',
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

      if (!result) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal membuat plan',
        });
      }

      const updatedClass = await prisma.class.updateMany({
        where: {
          id: {
            in: input.matkul.map((item) => item),
          },
        },
        data: {
          taken: {
            increment: 1,
          },
        },
      });

      if (!updatedClass) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal mengupdate kelas',
        });
      }

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
    .mutation(async ({ input, ctx }) => {
      // check user Id
      if (input.data.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Tidak dapat memperbarui rencana FRS',
        });
      }
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
          id: true,
          Matkul: {
            select: {
              sks: true,
            },
          },
          day: true,
          sessionId: true,
        },
        where: {
          id: {
            in: input.data.matkul.map((item: string) => item),
          },
        },
      });

      const previousClasses = await prisma.class.findMany({
        select: {
          id: true,
          Matkul: {
            select: {
              sks: true,
            },
          },
          day: true,
          sessionId: true,
        },
        where: {
          Plan: {
            some: {
              id: input.planId,
            },
          },
        },
      });

      if (previousClasses == null || previousClasses.length == 0) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Tidak ada kelas yang diambil sebelumnya',
        });
      }

      // get all dropped classes
      const droppedClasses = previousClasses.filter(
        (item) => !input.data.matkul.includes(item.id)
      );

      // get all added classes
      const addedClasses = classes.filter(
        (item) => !previousClasses.map((item) => item.id).includes(item.id)
      );

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

      //2. check class schedule conflict from inputed classes
      const scheduleConflict = classes.some((item1, index1) => {
        return classes.some((item2, index2) => {
          if (index1 !== index2) {
            return (
              item1.day === item2.day && item1.sessionId === item2.sessionId
            );
          }
          return false;
        });
      });

      if (scheduleConflict) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Terdapat kelas dengan jadwal yang sama',
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

      if (!updatedPlan) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal mengupdate plan',
        });
      }

      const decreasedTakenDroppedClass = await prisma.class.updateMany({
        where: {
          id: {
            in: droppedClasses.map((item) => item.id),
          },
        },
        data: {
          taken: {
            decrement: 1,
          },
        },
      });

      if (!decreasedTakenDroppedClass) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal mengupdate kelas',
        });
      }

      const increasedTakenAddedClass = await prisma.class.updateMany({
        where: {
          id: {
            in: addedClasses.map((item) => item.id),
          },
        },
        data: {
          taken: {
            increment: 1,
          },
        },
      });

      if (!increasedTakenAddedClass) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal mengupdate kelas',
        });
      }

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
    .query(async ({ input, ctx }) => {
      const classTaken = await prisma.plan.findUnique({
        select: {
          id: true,
          semester: true,
          title: true,
          totalSks: true,
          userId: true,
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

      if (classTaken.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Tidak dapat mengakses rencana FRS',
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
    .mutation(async ({ input, ctx }) => {
      const plannedFRS = await prisma.plan.findUnique({
        where: {
          id: input.planId,
        },
        select: {
          id: true,
          userId: true,
        },
      });

      if (!plannedFRS) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Rencana FRS Tidak Ditemukan',
        });
      }

      if (plannedFRS.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Tidak dapat menghapus rencana FRS',
        });
      }

      const previousClasses = await prisma.class.findMany({
        select: {
          id: true,
        },
        where: {
          Plan: {
            some: {
              id: input.planId,
            },
          },
        },
      });

      const deletedPlan = await prisma.plan.delete({
        select: {
          id: true,
        },
        where: {
          id: input.planId,
        },
      });

      if (deletedPlan == undefined || deletedPlan == null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Rencana FRS Tidak Ditemukan',
        });
      }

      try {
        await prisma.$queryRaw`DELETE FROM _ClassToPlan WHERE "A" = ${input.planId}`;
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal menghapus kelas',
        });
      }

      if (previousClasses.length == 0) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Tidak ada kelas yang diambil sebelumnya',
        });
      }

      try {
        await prisma.class.updateMany({
          where: {
            id: {
              in: previousClasses.map((item) => item.id),
            },
          },
          data: {
            taken: {
              decrement: 1,
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Gagal mengupdate kelas yang diambil sebelumnya',
        });
      }

      return deletedPlan;
    }),
});
