"use server";

import { type RouterInputs } from "@/trpc/react";
import { api } from "@/trpc/server";
import { TRPCClientError } from "@trpc/client";
import { redirect } from "next/navigation";

export async function registerUserAction(
  data: RouterInputs["user"]["register"],
) {
  try {
    await api.user.register(data);
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
    console.error("action err:", e);
  }
  redirect("/login");
}
