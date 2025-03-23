"use server";

import { RouterInputs } from "@/trpc/routers/root";
import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";

export async function deletePlanAction(
  data: RouterInputs["frs"]["deletePlan"],
) {
  try {
    await api.frs.deletePlan(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return { error: e.message };
    }
  }
  revalidatePath("/my-frs");
}
