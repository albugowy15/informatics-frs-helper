"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";
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
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { changePasswordSchema } from "../_schema";
import { useRouter } from "next/navigation";

type CreatePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
  const form = useForm<CreatePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });
  const router = useRouter();
  const mutatePassword = api.user.changePassword.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password berhasil diubah",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
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
                <Input type="password" placeholder="Password lama" {...field} />
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
                <Input type="password" placeholder="Password baru" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="flex w-full justify-center"
          type="submit"
          disabled={mutatePassword.isLoading}
        >
          {mutatePassword.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </>
          ) : (
            <>Ubah Password</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
