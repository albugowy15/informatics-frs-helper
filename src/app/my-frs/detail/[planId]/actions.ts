"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePlanAction(
  data: RouterInputs["frs"]["deletePlan"],
) {
  try {
    await api.frs.deletePlan.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return { error: e.message };
    }
  }
  revalidatePath("/my-frs");
  redirect("/my-frs");
}
