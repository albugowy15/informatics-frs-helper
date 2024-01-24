"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCError } from "@trpc/server";

export async function resetPasswordAction(
  data: RouterInputs["user"]["resetPassword"],
) {
  try {
    await api.user.resetPassword.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
  }
}
