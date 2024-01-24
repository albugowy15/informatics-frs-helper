"use server";

import { api } from "@/trpc/server";
import { type EditProfileFormType } from "./_components/edit-profile-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TRPCError } from "@trpc/server";

export async function updateProfileAction(data: EditProfileFormType) {
  try {
    await api.user.updateProfile.mutate(data);
  } catch (e) {
    if (e instanceof TRPCError) {
      return { error: e.message };
    }
  }
  revalidatePath("/profil");
  redirect("/profil");
}
