"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlanAction(
  data: RouterInputs["frs"]["createPlan"],
) {
  try {
    await api.frs.createPlan.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
  }
  revalidatePath("/my-frs");
  redirect("/my-frs");
}

export async function updatePlanAction(
  data: RouterInputs["frs"]["updatePlan"],
) {
  try {
    await api.frs.updatePlan.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) return { error: e.message };
  }
  revalidatePath("/my-frs");
  redirect("/my-frs");
}
