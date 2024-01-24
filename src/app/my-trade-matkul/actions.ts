"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["createTradeMatkul"],
) {
  try {
    await api.tradeMatkul.createTradeMatkul.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
  }
  revalidatePath("/my-trade-matkul");
  redirect("/my-trade-matkul");
}

export async function updateTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["updateTradeMatkul"],
) {
  try {
    await api.tradeMatkul.updateTradeMatkul.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
  }
  revalidatePath("/my-trade-matkul");
  redirect("/my-trade-matkul");
}

export async function deleteMyTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["deleteMyTradeMatkul"],
) {
  try {
    await api.tradeMatkul.deleteMyTradeMatkul.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
  }
  revalidatePath("/my-trade-matkul");
  redirect("/my-trade-matkul");
}
