"use server";

import { RouterInputs } from "@/trpc/routers/root";
import { api } from "@/trpc/server";
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
