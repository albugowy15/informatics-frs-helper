"use client";

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
import { useToastMutate } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";
import { resetPasswordAction } from "../actions";
import { forgotPasswordSchema } from "../schema";

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const mutation = useToastMutate({
    success: "Reset password berhasil, silahkan cek email",
    loading: "Mereset password...",
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    mutation.mutate(
      resetPasswordAction({
        email: data.email,
      }),
    );
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
              <Input placeholder="Email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <>
              <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
              Tunggu...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
