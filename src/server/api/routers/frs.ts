import { titleSchema } from "@/app/my-frs/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "@/server/db";

const frsPlanSchema = z.object({
  title: titleSchema,
  semester: z
    .number()
    .min(1, { message: "semester kosong" })
    .max(8, { message: "Semester lebih dari 8" }),
  matkul: z.string().array(),
});

export const frsRouter = createTRPCRouter({
  createPlan: protectedProcedure
    .input(frsPlanSchema)
    .mutation(async ({ input, ctx }) => {
      const [classes, totalPlan] = await Promise.all([
        prisma.class.findMany({
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
        }),
        prisma.plan.count({
          where: {
            userId: ctx.session.user.id,
          },
        }),
      ]);
      if (totalPlan >= 3) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Telah mencapai batas plan yang dapat dibuat",
        });
      }
      const totalSks = classes.reduce((acc, curr) => acc + curr.Matkul.sks, 0);
      if (totalSks > 24) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Total SKS tidak boleh lebih dari 24",
        });
      }

      try {
        await prisma.$transaction([
          prisma.plan.create({
            data: {
              title: input.title,
              semester: input.semester,
              userId: ctx.session.user.id,
              totalSks: totalSks,
              Class: {
                connect: input.matkul.map((item) => ({
                  id: item,
                })),
              },
            },
          }),

          prisma.class.updateMany({
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
          }),
        ]);
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal membuat rencana frs",
        });
      }
      return;
    }),
  validatePlan: protectedProcedure
    .input(
      z.object({ classTaken: z.string().array(), incomingClass: z.string() }),
    )
    .mutation(async ({ input }) => {
      if (input.classTaken.length == 0) {
        return {
          message: "Kelas berhasil diambil",
        };
      }
      const isUnique = input.classTaken.every(
        (item) => item !== input.incomingClass,
      );
      if (!isUnique) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Tidak boleh mengambil kelas yang sama",
        });
      }
      const [takenClass, checkClass] = await Promise.all([
        prisma.class.findMany({
          select: {
            id: true,
            Matkul: {
              select: {
                id: true,
                sks: true,
              },
            },
            taken: true,
            day: true,
            sessionId: true,
          },
          where: {
            id: {
              in: input.classTaken.map((item) => item),
            },
          },
        }),
        prisma.class.findUnique({
          select: {
            id: true,
            Matkul: {
              select: {
                id: true,
                sks: true,
              },
            },
            taken: true,
            day: true,
            sessionId: true,
          },
          where: {
            id: input.incomingClass,
          },
        }),
      ]);
      if (!checkClass) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Kelas tidak ditemukan",
        });
      }
      const totalSks = takenClass.reduce(
        (acc, curr) => acc + curr.Matkul.sks,
        0,
      );
      if (totalSks + checkClass.Matkul.sks > 24) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Total SKS tidak boleh lebih dari 24",
        });
      }
      const isSameSubject = takenClass.find((item) => {
        return item.Matkul.id === checkClass.Matkul.id;
      });
      if (isSameSubject) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Kamu sudah mengambil mata kuliah ini",
        });
      }
      const isScheduleConflict = takenClass.some((item) => {
        return (
          item.day != null &&
          item.sessionId != null &&
          item.day === checkClass.day &&
          item.sessionId === checkClass.sessionId
        );
      });
      if (isScheduleConflict) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Terdapat kelas dengan jadwal yang sama",
        });
      }
      return;
    }),
  updatePlan: protectedProcedure
    .input(
      z.object({
        planId: z
          .string({ required_error: "Id plan wajib diisi" })
          .min(1, { message: "Id plan kosong" }),
        data: frsPlanSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
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
          code: "NOT_FOUND",
          message: "Rencana FRS tidak ditemukan",
        });
      }
      const [classes, previousClasses] = await Promise.all([
        prisma.class.findMany({
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
        }),
        prisma.class.findMany({
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
        }),
      ]);

      if (previousClasses == null || previousClasses.length == 0) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Tidak ada kelas yang diambil sebelumnya",
        });
      }
      const droppedClasses = previousClasses.filter(
        (item) => !input.data.matkul.includes(item.id),
      );
      const addedClasses = classes.filter(
        (item) => !previousClasses.map((item) => item.id).includes(item.id),
      );
      const totalSks = classes.reduce((acc, curr) => acc + curr.Matkul.sks, 0);
      if (totalSks > 24) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Total SKS tidak boleh lebih dari 24",
        });
      }
      try {
        await prisma.$transaction([
          prisma.plan.update({
            select: {
              id: true,
            },
            where: {
              id: returnedPlanId.id,
            },
            data: {
              title: input.data.title,
              semester: input.data.semester,
              userId: ctx.session.user.id,
              totalSks: totalSks,
              Class: {
                set: input.data.matkul.map((item) => ({
                  id: item,
                })),
              },
            },
          }),
          prisma.class.updateMany({
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
          }),
          prisma.class.updateMany({
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
          }),
        ]);
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal memperbarui rencana FRS",
        });
      }
      return;
    }),
  getAllPlans: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.plan.findMany({
      select: {
        id: true,
        title: true,
        semester: true,
        totalSks: true,
      },
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  getPlanDetail: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
      }),
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
              taken: true,
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
          userId: ctx.session.user.id,
        },
      });
      if (classTaken == null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Rencana FRS Tidak Ditemukan",
        });
      }
      return classTaken;
    }),
  deletePlan: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const plannedFRS = await prisma.plan.findUnique({
        where: {
          id: input.planId,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!plannedFRS) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Rencana FRS Tidak Ditemukan",
        });
      }
      const [previousClasses, deletedPlan] = await Promise.all([
        prisma.class.findMany({
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
        }),
        prisma.plan.delete({
          select: {
            id: true,
          },
          where: {
            id: input.planId,
            userId: ctx.session.user.id,
          },
        }),
      ]);

      if (deletedPlan == undefined || deletedPlan == null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Rencana FRS Tidak Ditemukan",
        });
      }

      if (previousClasses.length == 0) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Tidak ada kelas yang diambil sebelumnya",
        });
      }
      try {
        await prisma.$transaction([
          prisma.$queryRaw`DELETE FROM _ClassToPlan WHERE "A" = ${input.planId}`,
          prisma.class.updateMany({
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
          }),
        ]);
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal menghapus kelas",
        });
      }
      return;
    }),
});
