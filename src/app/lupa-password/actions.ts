"use server";

import { api } from "@/trpc/server";
import { RouterInputs } from "@/utils/api";
import { TRPCError } from "@trpc/server";

export async function resetPasswordAction(
  data: RouterInputs["user"]["resetPassword"],
) {
  try {
    await api.user.resetPassword(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
    console.error("action err:", e);
  }
}
