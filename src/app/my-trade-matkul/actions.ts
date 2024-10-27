"use server";

import { type RouterInputs } from "@/utils/api";
import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";

export async function createTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["createTradeMatkul"],
) {
  try {
    await api.tradeMatkul.createTradeMatkul(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
    console.error("action err:", e);
  }
  revalidatePath("/my-trade-matkul");
}

export async function updateTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["updateTradeMatkul"],
) {
  try {
    await api.tradeMatkul.updateTradeMatkul(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
    console.error("action err:", e);
  }
  revalidatePath("/my-trade-matkul");
}

export async function deleteMyTradeMatkulAction(
  data: RouterInputs["tradeMatkul"]["deleteMyTradeMatkul"],
) {
  try {
    await api.tradeMatkul.deleteMyTradeMatkul(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return {
        error: e.message,
      };
    }
    console.error("action err:", e);
  }
  revalidatePath("/my-trade-matkul");
}
