"use client";

import * as React from "react";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
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
import { useToastMutate } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";
import { registerUserAction } from "../actions";
import { registerSchema } from "../schema";

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useToastMutate({
    success: "Akun berhasil dibuat, silahkan login",
    loading: "Mohon tunggu...",
    redirect: "/login",
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
              <FormDescription>
                Username maksimal 20 karakter tanpa spasi
              </FormDescription>
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
              <FormDescription>
                Gunakan email yang valid dan belum terdaftar
              </FormDescription>
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
              <FormDescription>
                Password 6 sampai 18 karakter terdiri dari huruf dan angka
              </FormDescription>
              <FormControl>
                <div>
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm py-1 font-medium text-primary cursor-pointer w-fit"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Sembunyikan" : "Tampilkan"} password
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormDescription>Ketik ulang password</FormDescription>
              <FormControl>
                <div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm py-1 font-medium text-primary cursor-pointer w-fit"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? "Sembunyikan" : "Tampilkan"}{" "}
                      password
                    </button>
                  </div>
                </div>
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
