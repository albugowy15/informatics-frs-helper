import {
  createTRPCProxyClient,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { headers } from "next/headers";

import { type AppRouter } from "@/server/api/root";

import { getUrl, transformer } from "./shared";

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    unstable_httpBatchStreamLink({
      url: getUrl(),
      headers() {
        const heads = new Map(headers());
        heads.set("x-trpc-source", "rsc");
        return Object.fromEntries(heads);
      },
    }),
  ],
});
