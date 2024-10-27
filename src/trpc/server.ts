import "server-only";

import * as React from "react";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { createCallerFactory, createTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";
import { makeQueryClient } from "./query-client";

export const getQueryClient = React.cache(makeQueryClient);
export const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient);
