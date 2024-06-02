"use server";

import { type RouterInputs } from "@/trpc/react";
import { api } from "@/trpc/server";
import { TRPCClientError } from "@trpc/client";

export async function resetPasswordAction(
  data: RouterInputs["user"]["resetPassword"],
) {
  try {
    await api.user.resetPassword(data);
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
    console.error("action err:", e);
  }
}
