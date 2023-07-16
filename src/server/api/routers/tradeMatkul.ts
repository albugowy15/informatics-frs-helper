import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { prisma } from '@/server/db';

export const tradeMatkulRouter = createTRPCRouter({
  createTradeMatkul: protectedProcedure
    .input(
      z.object({
        description: z.string().max(150),
        hasClassId: z.string(),
        searchClassId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const hasClass = await prisma.class.findUnique({
        select: {
          id: true,
        },
        where: {
          id: input.hasClassId,
        },
      });
      if (!hasClass) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Kelas yang dimiliki tidak ditemukan',
        });
      }
      const searchClass = await prisma.class.findUnique({
        select: {
          id: true,
        },
        where: {
          id: input.searchClassId,
        },
      });
      if (!searchClass) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Kelas yang dicari tidak ditemukan',
        });
      }
      if (hasClass.id === searchClass.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Tidak dapat bertukar dengan kelas yang sama',
        });
      }
      const result = prisma.tradeMatkul.create({
        data: {
          description: input.description,
          userId: ctx.session.user.id,
          hasMatkulId: hasClass.id,
          searchMatkulId: searchClass.id,
          closed: false,
        },
      });
      return result;
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
        },
      });
      if (!tradeMatkul) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Tidak dapat menemukan trade matkul',
        });
      }
      if (tradeMatkul.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Anda Tidak memiliki akses untuk mengubah trade matkul ini',
        });
      }
      const hasClass = await prisma.class.findUnique({
        select: {
          id: true,
        },
        where: {
          id: input.hasClassId,
        },
      });
      if (!hasClass) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Kelas yang dimiliki tidak ditemukan',
        });
      }
      const searchClass = await prisma.class.findUnique({
        select: {
          id: true,
        },
        where: {
          id: input.searchClassId,
        },
      });
      if (!searchClass) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Kelas yang dicari tidak ditemukan',
        });
      }
      if (hasClass.id === searchClass.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Tidak dapat bertukar dengan kelas yang sama',
        });
      }
      const result = prisma.tradeMatkul.update({
        where: {
          id: tradeMatkul.id,
        },
        data: {
          description: input.description,
          hasMatkulId: hasClass.id,
          searchMatkulId: searchClass.id,
          closed: false,
        },
      });
      return result;
    }),
  getAllMyTradeMatkul: protectedProcedure.query(({ ctx }) => {
    const tradeMatkul = prisma.tradeMatkul.findMany({
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
    return tradeMatkul;
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
        },
      });
      if (!returnedTradeMatkul) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Trade matkul tidak ditemukan',
        });
      }
      if (returnedTradeMatkul.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Tidak dapat menghapus trade matkul',
        });
      }
      try {
        await prisma.tradeMatkul.delete({
          where: {
            id: input.tradeMatkulId,
          },
        });
      } catch (e) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Matkul tidak ditemukan',
        });
      }
      return;
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
          code: 'NOT_FOUND',
          message: 'Trade Matkul tidak ditemukan',
        });
      }
      if (tradeMatkulPost.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Trade Matkul tidak dapat diakses',
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
      const tradeMatkulPosts = await prisma.tradeMatkul.findMany({
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
