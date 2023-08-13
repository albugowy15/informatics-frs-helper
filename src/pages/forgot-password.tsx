import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, GetSessionParams } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email tidak valid' })
    .nonempty({ message: 'Email tidak boleh kosong' }),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export default function ForgotPassword() {
  const methods = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { handleSubmit } = methods;
  const mutateForgotPassword = api.user.resetPassword.useMutation();
  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    toast.promise(
      mutateForgotPassword.mutateAsync({
        email: data.email,
      }),
      {
        loading: 'Silahkan tunggu',
        success: 'Reset password berhasil, silahkan cek email',
        error: (error) => error.message,
      },
    );
  };
  return (
    <>
      <NextSeo title={renderPageTitle('Lupa Password')} />
      <div className='mx-auto mt-6 w-full rounded-xl border border-neutral-500 p-4 md:w-96 md:p-10'>
        <Typography variant='h3' className='pb-5 text-center'>
          Lupa Password
        </Typography>
        <Typography variant='body2' className='pb-2 text-center'>
          Link untuk reset password akan dikirimkan ke emailmu. Cek juga di spam
          atau promosi.
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <TextInput label='Email' name='email' />

            <Button
              className='flex w-full justify-center'
              type='submit'
              variant='filled'
              disabled={mutateForgotPassword.isLoading}
            >
              Reset Password
            </Button>
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
