import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';

export const protectedRouter = createTRPCRouter({
  getUserProfile: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(({ input }) => {
      const userProfile = prisma.user
        .findUnique({
          where: { id: input.id },
        })
        .then((user) => {
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        });

      return userProfile;
    }),
  updateProfile: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        fullname: z.string().optional(),
        username: z.string().min(6).max(12).nonempty(),
        email: z.string().email().nonempty(),
        idLine: z.string().optional(),
        whatsapp: z.string(),
      })
    )
    .mutation(({ input }) => {
      const updatedProfile = prisma.user
        .update({
          where: {
            id: input.id,
          },
          data: {
            fullname: input.fullname,
            username: input.username,
            email: input.email,
            idLine: input.idLine,
            whatsapp: input.whatsapp,
          },
        })
        .then((res) => res.id);

      return updatedProfile;
    }),
  createPlan: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        semester: z.number(),
        matkul: z.array(z.object({ id: z.string() })),
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
            in: input.matkul.map((matkul) => matkul.id),
          },
        },
      });
      const totalSks = classes.reduce((acc, curr) => acc + curr.Matkul.sks, 0);
      const result = await prisma.plan.create({
        data: {
          title: input.title,
          semester: input.semester,
          userId: input.userId,
          totalSks: totalSks,
          Class: {
            connect: input.matkul,
          },
        },
      });

      return {
        id: result.id,
      };
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
      throw new Error('Class not found');
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
    .mutation(({ input }) => {
      const result = prisma.tradeMatkul.delete({
        where: {
          id: input.tradeMatkulId,
        },
      });
      return result;
    }),
  getClassByMatkul: protectedProcedure
    .input(
      z.object({
        matkulName: z.string(),
      })
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
        })
        .then((res) => res.map((item) => item.code));
      return classes;
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
      throw new Error('Class not found');
    }),
});
