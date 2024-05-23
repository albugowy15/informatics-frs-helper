"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { resetPasswordSchema } from "../schema";

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = (props: { token: string }) => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();
  const mutateResetPassword = api.user.verifyResetPassword.useMutation({
    onSuccess: () => {
      toast.success("Password berhasil diperbarui");
      router.replace("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    mutateResetPassword.mutate({
      token: props.token,
      newPassword: data.newPassword,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>Masukkan password baru Anda</FormDescription>
              <div>
                <Input
                  {...field}
                  type={showNewPassword ? "text" : "password"}
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="flex w-full justify-center"
          type="submit"
          loading={mutateResetPassword.isLoading}
        >
          Perbarui Password
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
