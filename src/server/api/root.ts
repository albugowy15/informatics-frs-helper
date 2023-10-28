import { commonRouter } from "@/server/api/routers/common";
import { frsRouter } from "@/server/api/routers/frs";
import { tradeMatkulRouter } from "@/server/api/routers/tradeMatkul";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";

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
