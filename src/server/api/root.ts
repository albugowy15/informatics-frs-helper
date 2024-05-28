import { commonRouter } from "@/server/api/routers/common";
import { frsRouter } from "@/server/api/routers/frs";
import { tradeMatkulRouter } from "@/server/api/routers/trade-matkul";
import { userRouter } from "@/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  common: commonRouter,
  user: userRouter,
  tradeMatkul: tradeMatkulRouter,
  frs: frsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
