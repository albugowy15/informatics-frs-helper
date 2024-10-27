"use server";

import { api } from "@/trpc/server";
import { RouterInputs } from "@/utils/api";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";

export async function createPlanAction(
  data: RouterInputs["frs"]["createPlan"],
) {
  try {
    await api.frs.createPlan(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
    console.error("action err:", e);
  }
  revalidatePath("/my-frs");
}

export async function updatePlanAction(
  data: RouterInputs["frs"]["updatePlan"],
) {
  try {
    await api.frs.updatePlan(data);
  } catch (e) {
    if (e instanceof TRPCError) return { error: e.message };
    console.error("action err:", e);
  }
  revalidatePath("/my-frs");
}
