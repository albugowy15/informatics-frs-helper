import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { z } from 'zod';

import BasicLink from '@/components/BasicLink';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

const loginSchema = z.object({
  username: z.string().nonempty({ message: 'Username tidak boleh kosong' }),
  password: z.string().nonempty({ message: 'Password tidak boleh kosong' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    toast.loading('Silahkan tunggu');
    signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res) {
        if (res.ok) {
          toast.remove();
          toast.success('Login berhasil');
          window.location.replace('/');
        } else {
          toast.remove();
          toast.error('Username atau password salah');
        }
      }
    });
  };

  return (
    <div className='mx-auto mt-6 w-full rounded-xl border border-neutral-500 p-4 md:w-96 md:p-10'>
      <Typography variant='h2' className='pb-5 text-center'>
        Silahkan Login
      </Typography>
      <Toaster />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label='Username' name='username' />
          <TextInput type='password' label='Password' name='password' />
          <Typography variant='label1' className='mb-3 text-primary-500'>
            <BasicLink href='/reset-password' className=''>
              Lupa Password?
            </BasicLink>
          </Typography>
          <Button
            className='flex w-full justify-center'
            type='submit'
            variant='filled'
          >
            Login
          </Button>
          <Typography variant='body2' className='pt-3 text-center'>
            Belum punya akun?{' '}
            <BasicLink
              className='font-medium text-primary-500'
              href='/register'
            >
              Daftar
            </BasicLink>
          </Typography>
        </form>
      </FormProvider>
    </div>
  );
}
