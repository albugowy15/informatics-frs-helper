"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { editProfileSchema } from "../_schema/edit-profile-schema";

type EditProfileFormType = z.infer<typeof editProfileSchema>;

type UserProfile = RouterOutputs["user"]["getUserProfile"];

const EditProfileForm = ({ userProfile }: { userProfile: UserProfile }) => {
  const form = useForm<EditProfileFormType>({
    resolver: zodResolver(editProfileSchema),

    defaultValues: {
      fullname: userProfile.fullname ?? "",
      username: userProfile.username ?? "",
      email: userProfile.email ?? "",
      idLine: userProfile.idLine ?? "",
      whatsapp: userProfile.whatsapp ?? "",
    },
  });

  const mutation = api.user.updateProfile.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profil berhasil diperbarui",
      });
      window.location.replace("/profil");
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<EditProfileFormType> = (data) => {
    mutation.mutate({
      email: data.email,
      fullname: data.fullname,
      idLine: data.idLine,
      whatsapp: data.whatsapp,
      username: data.username,
    });
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <Input {...field} placeholder="Contoh: John Doe" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <Input {...field} placeholder="Contoh: johndoe" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} placeholder="Contoh: johndoe@gmail.com" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Line</FormLabel>
                <Input {...field} placeholder="Contoh: @johndoe" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Whatsapp</FormLabel>
                <Input {...field} placeholder="Contoh: 081234567890" />
              </FormItem>
            )}
          />

          <div className="py-2" />
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait..
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Perbarui Profil
              </>
            )}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default EditProfileForm;
