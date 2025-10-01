import "server-only";

import * as React from "react";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/root";
import { createCallerFactory, createTRPCContext } from "./init";
// import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const getQueryClient = React.cache(makeQueryClient);
export const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient);

// export default {
//   async fetch(request: Request): Promise<Response> {
//     return fetchRequestHandler({
//       endpoint: "/trpc",
//       req: request,
//       router: appRouter,
//       createTRPCContext,
//     });
//   },
// };
