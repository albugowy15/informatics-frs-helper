"use server";

import { api } from "@/trpc/server";
import { TRPCClientError } from "@trpc/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type EditProfileFormType } from "./_components/edit-profile-form";

export async function updateProfileAction(data: EditProfileFormType) {
  try {
    await api.user.updateProfile.mutate(data);
  } catch (e) {
    if (e instanceof TRPCClientError) {
      return { error: e.message };
    }
  }
  revalidatePath("/profil");
  redirect("/profil");
}
