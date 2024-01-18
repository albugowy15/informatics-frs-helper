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
    await api.frs.createPlan.mutate(data);
    revalidatePath("/my-frs");
    redirect("/my-frs");
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
  }
}

export async function updatePlanAction(
  data: RouterInputs["frs"]["updatePlan"],
) {
  try {
    await api.frs.updatePlan.mutate(data);
    revalidatePath("/my-frs");
    redirect("/my-frs");
  } catch (e) {
    if (e instanceof TRPCClientError) return { error: e.message };
  }
}
