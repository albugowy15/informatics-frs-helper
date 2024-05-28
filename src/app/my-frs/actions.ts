"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCClientError } from "@trpc/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlanAction(
  data: RouterInputs["frs"]["createPlan"],
) {
  try {
    await api.frs.createPlan(data);
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
    console.error("action err:", e);
  }
  revalidatePath("/my-frs");
  redirect("/my-frs");
}

export async function updatePlanAction(
  data: RouterInputs["frs"]["updatePlan"],
) {
  try {
    await api.frs.updatePlan(data);
  } catch (e) {
    if (e instanceof TRPCClientError) return { error: e.message };
    console.error("action err:", e);
  }
  revalidatePath("/my-frs");
  redirect("/my-frs");
}
