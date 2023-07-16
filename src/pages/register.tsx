import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getSession, GetSessionParams } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { renderPageTitle } from '@/utils/page';

import BasicLink from '@/components/BasicLink';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

const registerSchema = z.object({
  username: z.string().nonempty({ message: 'Username tidak boleh kosong' }),
  email: z
    .string()
    .email({ message: 'Email harus valid' })
    .nonempty({ message: 'Email tidak boleh kosong' }),
  password: z
    .string()
    .nonempty({ message: 'Password tidak boleh kosong' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .max(16, { message: 'Password maksimal 16 karakter' }),
  confirmPassword: z
    .string()
    .nonempty({ message: 'Password tidak boleh kosong' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .max(16, { message: 'Password maksimal 16 karakter' }),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const methods = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const onSubmit = async (data: RegisterForm) => {
    setButtonDisabled(true);
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Akun berhasil dibuat, silahkan login');
        router.push('/login');
        setButtonDisabled(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setButtonDisabled(false);
      });
  };

  return (
    <>
      <NextSeo title={renderPageTitle('Register')} />
      <div className='mx-auto mt-6 w-full rounded-xl border border-neutral-500 p-4 md:w-96 md:p-10'>
        <Typography variant='h2' className='pb-5 text-center'>
          Silahkan Register
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-3'>
            <TextInput label='Username' name='username' />
            <TextInput label='Email' name='email' />
            <TextInput type='password' label='Password' name='password' />
            <TextInput
              type='password'
              label='Konfirmasi Password'
              name='confirmPassword'
            />
            <Button
              className='flex w-full justify-center'
              type='submit'
              variant='filled'
              disabled={buttonDisabled}
            >
              Register
            </Button>
            <Typography variant='body2' className='pt-3 text-center'>
              Sudah punya akun?{' '}
              <BasicLink className='font-medium text-primary-500' href='/login'>
                Login
              </BasicLink>
            </Typography>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

export async function getServerSideProps(
  context: GetSessionParams | undefined,
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
