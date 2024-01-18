"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCClientError } from "@trpc/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePlanAction(
  data: RouterInputs["frs"]["deletePlan"],
) {
  try {
    await api.frs.deletePlan.mutate(data);
    revalidatePath("/my-frs");
    redirect("/my-frs");
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return { error: e.message };
    }
  }
}
