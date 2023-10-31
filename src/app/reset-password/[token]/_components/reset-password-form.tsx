"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";

import { api } from "@/trpc/react";
import { resetPasswordSchema } from "../_schema/reset-password-schema";

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = ({ token }: { token: string }) => {
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const mutateResetPassword = api.user.verifyResetPassword.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password berhasil diperbarui",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    mutateResetPassword.mutate({
      token: token,
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </>
          ) : (
            <>Perbarui Password</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
