import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import prisma from "@/server/db";

export const tradeMatkulRouter = createTRPCRouter({
  createTradeMatkul: protectedProcedure
    .input(
      z.object({
        description: z
          .string()
          .min(1, { message: "Deskripsi kosong" })
          .max(150),
        hasClassId: z.string().min(1, { message: "hasClassId kosong" }),
        searchClassId: z.string().min(1, { message: "searchClassId kosong" }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [hasClass, searchClass] = await Promise.all([
        prisma.class.findUnique({
          select: {
            id: true,
          },
          where: {
            id: input.hasClassId,
          },
        }),
        prisma.class.findUnique({
          select: {
            id: true,
          },
          where: {
            id: input.searchClassId,
          },
        }),
      ]);
      if (!hasClass) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kelas yang dimiliki tidak ditemukan",
        });
      }
      if (!searchClass) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kelas yang dicari tidak ditemukan",
        });
      }
      if (hasClass.id === searchClass.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Tidak dapat bertukar dengan kelas yang sama",
        });
      }
      try {
        if (!ctx.session.user.id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
        await prisma.tradeMatkul.create({
          data: {
            description: input.description,
            userId: ctx.session.user.id,
            hasMatkulId: hasClass.id,
            searchMatkulId: searchClass.id,
            closed: false,
          },
        });
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal membuat trade matkul",
        });
      }
    }),
  updateTradeMatkul: protectedProcedure
    .input(
      z.object({
        tradeMatkulId: z.string(),
        description: z.string().max(150),
        hasClassId: z.string(),
        searchClassId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const tradeMatkul = await prisma.tradeMatkul.findUnique({
        select: {
          id: true,
          userId: true,
        },
        where: {
          id: input.tradeMatkulId,
          userId: ctx.session.user.id,
        },
      });
      if (!tradeMatkul) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tidak dapat menemukan trade matkul",
        });
      }
      const [hasClass, searchClass] = await Promise.all([
        prisma.class.findUnique({
          select: {
            id: true,
          },
          where: {
            id: input.hasClassId,
          },
        }),
        prisma.class.findUnique({
          select: {
            id: true,
          },
          where: {
            id: input.searchClassId,
          },
        }),
      ]);
      if (!hasClass) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kelas yang dimiliki tidak ditemukan",
        });
      }
      if (!searchClass) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kelas yang dicari tidak ditemukan",
        });
      }
      if (hasClass.id === searchClass.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Tidak dapat bertukar dengan kelas yang sama",
        });
      }
      try {
        await prisma.tradeMatkul.update({
          where: {
            id: tradeMatkul.id,
            userId: ctx.session.user.id,
          },
          data: {
            description: input.description,
            hasMatkulId: hasClass.id,
            searchMatkulId: searchClass.id,
            closed: false,
          },
        });
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          message: "Gagal memperbarui trade matkul",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getAllMyTradeMatkul: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.tradeMatkul.findMany({
      select: {
        id: true,
        description: true,
        closed: true,
        searchMatkul: {
          select: {
            code: true,
            Matkul: {
              select: {
                name: true,
              },
            },
          },
        },
        hasMatkul: {
          select: {
            code: true,
            Matkul: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  deleteMyTradeMatkul: protectedProcedure
    .input(
      z.object({
        tradeMatkulId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const returnedTradeMatkul = await prisma.tradeMatkul.findUnique({
        select: {
          id: true,
          userId: true,
        },
        where: {
          id: input.tradeMatkulId,
          userId: ctx.session.user.id,
        },
      });
      if (!returnedTradeMatkul) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Trade matkul tidak ditemukan",
        });
      }
      try {
        await prisma.tradeMatkul.delete({
          where: {
            id: input.tradeMatkulId,
            userId: ctx.session.user.id,
          },
        });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal menghapus trade matkul",
        });
      }
    }),
  getTradeMatkul: protectedProcedure
    .input(
      z.object({
        tradeMatkulId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const tradeMatkulPost = await prisma.tradeMatkul.findUnique({
        where: {
          id: input.tradeMatkulId,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          description: true,
          userId: true,
          hasMatkul: {
            select: {
              Matkul: {
                select: {
                  id: true,
                  name: true,
                  semester: true,
                },
              },
              id: true,
              code: true,
            },
          },
          searchMatkul: {
            select: {
              Matkul: {
                select: {
                  name: true,
                  id: true,
                  semester: true,
                },
              },
              id: true,
              code: true,
            },
          },
        },
      });
      if (!tradeMatkulPost) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Trade Matkul tidak ditemukan",
        });
      }
      return tradeMatkulPost;
    }),

  getAllTradeMatkul: publicProcedure
    .input(
      z.object({
        semester: z.number().min(1).max(8).optional(),
        matkul: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.tradeMatkul.findMany({
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
          searchMatkul: {
            Matkul: {
              semester: input.semester ?? undefined,
              name:
                input.matkul === "" || input.matkul === "Semua"
                  ? undefined
                  : input.matkul,
            },
          },
        },
      });
    }),
});
