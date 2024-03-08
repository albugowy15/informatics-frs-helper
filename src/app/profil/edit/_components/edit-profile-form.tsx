"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToastMutate } from "@/lib/hooks";
import { type RouterOutputs } from "@/trpc/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import React from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";
import { editProfileSchema } from "../../schema";
import { updateProfileAction } from "../actions";

export type EditProfileFormType = z.infer<typeof editProfileSchema>;

type UserProfile = RouterOutputs["user"]["getUserProfile"];

const EditProfileForm = (props: { userProfile: UserProfile }) => {
  const form = useForm<EditProfileFormType>({
    resolver: zodResolver(editProfileSchema),

    defaultValues: {
      fullname: props.userProfile.fullname ?? "",
      username: props.userProfile.username ?? "",
      email: props.userProfile.email ?? "",
      idLine: props.userProfile.idLine ?? "",
      whatsapp: props.userProfile.whatsapp ?? "",
    },
  });
  const mutation = useToastMutate({
    success: "Profil berhasil diperbarui",
    loading: "Memperbarui profil",
  });

  const onFormSubmit: SubmitHandler<EditProfileFormType> = async (data) => {
    mutation.mutate(updateProfileAction(data));
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onFormSubmit(data))}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contoh: John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contoh: johndoe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contoh: johndoe@gmail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idLine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Line</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contoh: @johndoe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contoh: 081234567890" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-2" />
        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <>
              <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
              Tunggu...
            </>
          ) : (
            "Perbarui Profil"
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default EditProfileForm;
