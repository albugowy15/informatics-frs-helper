"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { asOptionalField } from "@/lib/utils";
import { api } from "@/trpc/react";

const editProfileForm = z.object({
  fullname: z.string().optional(),
  username: z
    .string({ required_error: "Username wajib diisi" })
    .min(6, { message: "Username minimal 6 karakter" })
    .max(12, { message: "Username maksimal 12 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  idLine: asOptionalField(
    z.string().startsWith("@", { message: "Id Line ditulis dengan awalan @" }),
  ),
  whatsapp: asOptionalField(
    z
      .string()
      .min(9, { message: "No. Whatsapp minimal 9 angka" })
      .max(14, { message: "No. Whatsapp maksima 9 angka" })
      .startsWith("08", { message: "No. Whatsapp tidak valid" })
      .regex(/^[0-9]*$/, { message: "No. Whatsapp tidak valid" }),
  ),
});

type EditProfileFormType = z.infer<typeof editProfileForm>;

type UserProfile = {
  fullname: string | null;
  username: string;
  email: string;
  idLine: string | null;
  whatsapp: string | null;
};

const EditProfileForm = ({ userProfile }: { userProfile: UserProfile }) => {
  const form = useForm<EditProfileFormType>({
    resolver: zodResolver(editProfileForm),

    defaultValues: {
      fullname: userProfile.fullname ?? "",
      username: userProfile.username ?? "",
      email: userProfile.email ?? "",
      idLine: userProfile.idLine ?? "",
      whatsapp: userProfile.whatsapp ?? "",
    },
  });

  const mutation = api.user.updateProfile.useMutation();

  const onSubmit: SubmitHandler<EditProfileFormType> = (data) => {
    mutation
      .mutateAsync({
        email: data.email,
        fullname: data.fullname,
        idLine: data.idLine,
        whatsapp: data.whatsapp,
        username: data.username,
      })
      .then((res) => {
        if (res) {
          toast({
            title: "Success",
            description: "Profil berhasil diperbarui",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
        });
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
