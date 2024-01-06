"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";

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
import { resetPasswordSchema } from "../schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = (props: { token: string }) => {
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
              <Input {...field} type="password" />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="flex w-full justify-center"
          type="submit"
          disabled={mutateResetPassword.isLoading}
        >
          {mutateResetPassword.isLoading ? (
            <>
              <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </>
          ) : (
            "Perbarui Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
