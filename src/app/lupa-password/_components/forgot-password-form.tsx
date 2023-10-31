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
import { forgotPasswordSchema } from "../_schema/forgot-password-schema";

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const mutateForgotPassword = api.user.resetPassword.useMutation({
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Success",
        description: "Reset password berhasil, silahkan cek email",
      });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    mutateForgotPassword.mutate({
      email: data.email,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormDescription>Masukkan email yang terdaftar</FormDescription>
              <Input placeholder="email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutateForgotPassword.isLoading}>
          {mutateForgotPassword.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </>
          ) : (
            <>Reset Password</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
