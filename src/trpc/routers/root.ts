import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../init";
import { commonRouter } from "./common";
import { frsRouter } from "./frs";
import { tradeMatkulRouter } from "./trade-matkul";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  common: commonRouter,
  user: userRouter,
  tradeMatkul: tradeMatkulRouter,
  frs: frsRouter,
});

export type AppRouter = typeof appRouter;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
