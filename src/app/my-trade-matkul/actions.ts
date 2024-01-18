"use server";

import { api } from "@/trpc/server";
import { type RouterInputs } from "@/trpc/shared";
import { TRPCClientError } from "@trpc/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["createTradeMatkul"],
) {
  try {
    await api.tradeMatkul.createTradeMatkul.mutate(data);
    revalidatePath("/my-trade-matkul");
    redirect("/my-trade-matkul");
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
  }
}

export async function updateTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["updateTradeMatkul"],
) {
  try {
    await api.tradeMatkul.updateTradeMatkul.mutate(data);
    revalidatePath("/my-trade-matkul");
    redirect("/my-trade-matkul");
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
  }
}

export async function deleteMyTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["deleteMyTradeMatkul"],
) {
  try {
    await api.tradeMatkul.deleteMyTradeMatkul.mutate(data);
    revalidatePath("/my-trade-matkul");
    redirect("/my-trade-matkul");
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return {
        error: e.message,
      };
    }
  }
}
