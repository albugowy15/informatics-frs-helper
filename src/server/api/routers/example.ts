import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  test: publicProcedure.query(({ ctx }) => {
    if (ctx.session) {
      return ctx.session.user.username;
    }
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
