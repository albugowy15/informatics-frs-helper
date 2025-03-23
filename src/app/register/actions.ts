"use server";

import { RouterInputs } from "@/trpc/routers/root";
import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";

export async function registerUserAction(
  data: RouterInputs["user"]["register"],
) {
  try {
    await api.user.register(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
  }
}
