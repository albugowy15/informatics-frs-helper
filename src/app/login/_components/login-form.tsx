"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";
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
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { loginSchema } from "../schema";

type LoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setButtonDisabled(true);
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          toast.error("Username atau password salah");
          setButtonDisabled(false);
        } else {
          toast.success("Login Berhasil");
          setButtonDisabled(false);
          window.location.replace("/");
        }
      })
      .catch(() => {
        toast.error("Terjadi kesalahan");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email atau Username</FormLabel>
              <FormDescription>
                Silahkan masukkan username atau email
              </FormDescription>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Username atau email"
                  {...field}
                />
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
              <FormDescription>Silahkan masukkan password</FormDescription>
              <FormControl>
                <div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
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
        <div className="flex flex-col text-center">
          <Button type="submit" loading={buttonDisabled}>
            Login
          </Button>

          <Link
            href="/lupa-password"
            className="mt-2 text-xs underline transition-colors hover:text-primary"
          >
            Lupa Password?
          </Link>
        </div>

        <Typography variant="body1" className="text-center text-sm">
          Belum punya akun?
          <Link
            href="/register"
            className="ml-2 font-bold underline transition-colors hover:text-primary"
          >
            Daftar
          </Link>
        </Typography>
      </form>
    </Form>
  );
};

export default LoginForm;
