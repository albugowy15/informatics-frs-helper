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
        userId: z.string(),
        hasClass: z.object({
          name: z.string(),
          code: z.string(),
        }),
        searchClass: z.object({
          name: z.string(),
          code: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const hasClassId = await prisma.class.findFirst({
        select: {
          id: true,
        },
        where: {
          code: input.hasClass.code,
          AND: {
            Matkul: {
              name: input.hasClass.name,
            },
          },
        },
      });
      const searchClassId = await prisma.class.findFirst({
        select: {
          id: true,
        },
        where: {
          code: input.searchClass.code,
          AND: {
            Matkul: {
              name: input.searchClass.name,
            },
          },
        },
      });
      if (hasClassId && searchClassId) {
        const result = prisma.tradeMatkul.create({
          data: {
            description: input.description,
            userId: input.userId,
            hasMatkulId: hasClassId?.id,
            searchMatkulId: searchClassId?.id,
            closed: false,
          },
        });
        return result;
      }
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Class not found',
      });
    }),
  getAllMyTradeMatkul: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ input }) => {
      const tradeMatkul = prisma.tradeMatkul.findMany({
        select: {
          id: true,
          description: true,
          closed: true,
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
        },
        where: {
          userId: input.userId,
        },
      });

      return tradeMatkul;
    }),
  deleteMyTradeMatkul: protectedProcedure
    .input(
      z.object({
        tradeMatkulId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await prisma.tradeMatkul.delete({
        select: {
          id: true,
        },
        where: {
          id: input.tradeMatkulId,
        },
      });

      if (!result) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Matkul tidak ditemukan',
        });
      }

      return result;
    }),
  getTradeMatkul: protectedProcedure
    .input(
      z.object({
        tradeMatkulId: z.string(),
      })
    )
    .query(({ input }) => {
      const tradeMatkulPost = prisma.tradeMatkul.findUnique({
        where: {
          id: input.tradeMatkulId,
        },
        select: {
          id: true,
          description: true,
          hasMatkul: {
            select: {
              Matkul: {
                select: {
                  name: true,
                  semester: true,
                },
              },
              code: true,
            },
          },
          searchMatkul: {
            select: {
              Matkul: {
                select: {
                  name: true,
                  semester: true,
                },
              },
              code: true,
            },
          },
        },
      });

      return tradeMatkulPost;
    }),
  updateTradeMatkul: protectedProcedure
    .input(
      z.object({
        tradeMatkulId: z.string(),
        description: z.string().max(150),
        hasClass: z.object({
          name: z.string(),
          code: z.string(),
        }),
        searchClass: z.object({
          name: z.string(),
          code: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const hasClassId = await prisma.class.findFirst({
        select: {
          id: true,
        },
        where: {
          code: input.hasClass.code,
          AND: {
            Matkul: {
              name: input.hasClass.name,
            },
          },
        },
      });
      const searchClassId = await prisma.class.findFirst({
        select: {
          id: true,
        },
        where: {
          code: input.searchClass.code,
          AND: {
            Matkul: {
              name: input.searchClass.name,
            },
          },
        },
      });
      if (hasClassId && searchClassId) {
        const result = prisma.tradeMatkul.update({
          data: {
            description: input.description,
            hasMatkulId: hasClassId.id,
            searchMatkulId: searchClassId.id,
            closed: false,
          },
          where: {
            id: input.tradeMatkulId,
          },
        });
        return result;
      }
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Class not found',
      });
    }),
  getAllTradeMatkul: publicProcedure
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
