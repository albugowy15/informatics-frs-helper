import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, GetSessionParams, signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { z } from 'zod';

import { renderPageTitle } from '@/utils/page';

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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setButtonDisabled(true);
    toast.loading('Silahkan tunggu');
    signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        toast.remove();
        toast.success('Login berhasil');
        setButtonDisabled(false);
        window.location.replace('/');
      } else {
        toast.remove();
        toast.error('Username atau password salah');
        setButtonDisabled(false);
      }
    });
  };

  return (
    <>
      <NextSeo title={renderPageTitle('Login')} />
      <div className='mx-auto mt-6 w-full rounded-xl border border-neutral-500 p-4 md:w-96 md:p-10'>
        <Typography variant='h2' className='pb-5 text-center'>
          Silahkan Login
        </Typography>
        <Toaster />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <TextInput label='Username' name='username' />
            <TextInput type='password' label='Password' name='password' />

            <Button
              className='flex w-full justify-center'
              type='submit'
              variant='filled'
              disabled={buttonDisabled}
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
    </>
  );
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
