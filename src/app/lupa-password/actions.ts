"use server";

import { type RouterInputs } from "@/trpc/react";
import { api } from "@/trpc/server";
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
