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
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return { error: e.message };
    }
    console.error("action err:", e);
  }
  revalidatePath("/my-frs");
  redirect("/my-frs");
}
