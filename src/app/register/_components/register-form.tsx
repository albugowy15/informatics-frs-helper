"use client";

import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToastMutate } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";
import { registerUserAction } from "../actions";
import { registerSchema } from "../schema";

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useToastMutate({
    success: "Akun berhasil dibuat, silahkan login",
    loading: "Mohon tunggu...",
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    mutation.mutate(registerUserAction(data));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
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
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <Button type="submit" loading={mutation.isLoading}>
            Register
          </Button>
        </div>
        <Typography variant="body1" className="text-center text-sm">
          Sudah punya akun?
          <Link
            href="/login"
            className="ml-2 font-bold underline transition-colors hover:text-primary"
          >
            Login
          </Link>
        </Typography>
      </form>
    </Form>
  );
};

export default RegisterForm;
