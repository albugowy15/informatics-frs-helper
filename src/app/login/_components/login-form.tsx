'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const loginSchema = z.object({
  username: z
    .string({
      required_error: 'Username tidak boleh kosong',
      invalid_type_error: 'Username tidak valid',
    })
    .min(1, { message: 'Username tidak boleh kosong' }),
  password: z
    .string({
      required_error: 'Password tidak boleh kosong',
      invalid_type_error: 'Password tidak valid',
    })
    .min(1, { message: 'Password tidak boleh kosong' }),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = form;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setButtonDisabled(true);
    const signIn = (await import('next-auth/react')).signIn;
    signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        toast({
          title: 'Success',
          description: 'Login berhasil',
        });
        setButtonDisabled(false);
        window.location.replace('/');
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Username atau password salah',
        });
        setButtonDisabled(false);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email atau Username</FormLabel>
              <FormDescription>Silahkan masukkan username</FormDescription>
              <FormControl>
                <Input type='text' placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>Silahkan masukkan password</FormDescription>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col'>
          <Button type='submit' disabled={buttonDisabled}>
            {buttonDisabled ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              'Login'
            )}
          </Button>
          <Button variant='link' asChild>
            <Link href='/lupa-password'>Lupa Password?</Link>
          </Button>
        </div>
        <Typography variant='body1' className='text-center'>
          Belum punya akun?
          <Button variant='link' asChild>
            <Link href='/register'>Daftar</Link>
          </Button>
        </Typography>
      </form>
    </Form>
  );
};

export default LoginForm;
