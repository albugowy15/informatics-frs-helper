"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCClientError } from "@trpc/client";

export async function resetPasswordAction(
  data: RouterInputs["user"]["resetPassword"],
) {
  try {
    await api.user.resetPassword.mutate(data);
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
  }
}
