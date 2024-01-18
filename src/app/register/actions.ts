"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCClientError } from "@trpc/client";
import { redirect } from "next/navigation";

export async function registerUserAction(
  data: RouterInputs["user"]["register"],
) {
  try {
    await api.user.register.mutate(data);
    redirect("/login");
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
  }
}
