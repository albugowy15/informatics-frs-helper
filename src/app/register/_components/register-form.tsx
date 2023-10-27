'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const registerSchema = z.object({
  username: z
    .string({ required_error: 'Username wajib diisi' })
    .min(1, { message: 'Username tidak boleh kosong' }),
  email: z
    .string()
    .email({ message: 'Email harus valid' })
    .min(1, { message: 'Email tidak boleh kosong' }),
  password: z
    .string()
    .min(1, { message: 'Password tidak boleh kosong' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .max(16, { message: 'Password maksimal 16 karakter' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Password tidak boleh kosong' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .max(16, { message: 'Password maksimal 16 karakter' }),
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const { toast } = useToast();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const onSubmit = async (data: RegisterForm) => {
    setButtonDisabled(true);
    axios
      .post('/api/register', data)
      .then(() => {
        toast({
          title: 'Success',
          description: 'Akun berhasil dibuat, silahkan login',
        });
        window.location.replace('/login');
        setButtonDisabled(false);
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: err.response.data.message,
        });
        setButtonDisabled(false);
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
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
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
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
              'Register'
            )}
          </Button>
        </div>
        <Typography variant='body1' className='text-center'>
          Sudah punya akun?
          <Button variant='link' asChild>
            <Link href='/login'>Login</Link>
          </Button>
        </Typography>
      </form>
    </Form>
  );
};

export default RegisterForm;
