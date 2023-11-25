"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";

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
import { api } from "@/trpc/react";
import { registerSchema } from "../schema";
import { useToast } from "@/components/ui/use-toast";

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const { toast } = useToast();
  const mutateRegister = api.user.register.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Akun berhasil dibuat, silahkan login",
      });
      window.location.replace("/login");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    mutateRegister.mutate(data);
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
          <Button type="submit" disabled={mutateRegister.isLoading}>
            {mutateRegister.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Register"
            )}
          </Button>
        </div>
        <Typography variant="body1" className="text-center">
          Sudah punya akun?
          <Button variant="link" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </Typography>
      </form>
    </Form>
  );
};

export default RegisterForm;
