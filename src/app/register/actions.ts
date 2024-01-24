"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";

export async function registerUserAction(
  data: RouterInputs["user"]["register"],
) {
  try {
    await api.user.register.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
  }
  redirect("/login");
}
