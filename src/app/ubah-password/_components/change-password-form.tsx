"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { changePasswordSchema } from "../schema";

type CreatePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const form = useForm<CreatePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });
  const router = useRouter();
  const mutatePassword = api.user.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password berhasil diubah");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit: SubmitHandler<CreatePasswordForm> = (data) => {
    mutatePassword.mutate({
      new_password: data.new_password,
      old_password: data.old_password,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password lama</FormLabel>
              <FormDescription>Masukkan password lama Anda</FormDescription>
              <FormControl>
                <div>
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Password lama"
                    {...field}
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm py-1 font-medium text-primary cursor-pointer w-fit"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? "Sembunyikan" : "Tampilkan"} password
                    </button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password baru</FormLabel>
              <FormDescription>Masukkan password baru Anda</FormDescription>
              <FormControl>
                <div>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Password baru"
                    {...field}
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm py-1 font-medium text-primary cursor-pointer w-fit"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? "Sembunyikan" : "Tampilkan"} password
                    </button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="flex w-full justify-center"
          type="submit"
          loading={mutatePassword.isLoading}
        >
          Ubah Password
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
