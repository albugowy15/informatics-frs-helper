"use server";

import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { type EditProfileFormType } from "./_components/edit-profile-form";
import { TRPCError } from "@trpc/server";

export async function updateProfileAction(data: EditProfileFormType) {
  try {
    await api.user.updateProfile(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return { error: e.message };
    }
  }
  revalidatePath("/profil");
}
