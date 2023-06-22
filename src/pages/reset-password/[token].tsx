import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
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

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .nonempty({ message: 'Password tidak boleh kosong' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .max(16, { message: 'Password maksimal 16 karakter' }),
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const methods = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();
  const { handleSubmit } = methods;
  const mutateResetPassword = api.user.verifyResetPassword.useMutation();
  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    const token = router.query.token as string;
    toast.promise(
      mutateResetPassword.mutateAsync({
        token: token,
        newPassword: data.newPassword,
      }),
      {
        loading: 'Memperbarui password',
        success: 'Password berhasil diperbarui',
        error: (error) => error.message,
      }
    );
  };
  return (
    <>
      <NextSeo title={renderPageTitle('Reset Password')} />
      <div className='mx-auto mt-6 w-full rounded-xl border border-neutral-500 p-4 md:w-96 md:p-10'>
        <Typography variant='h2' className='pb-5 text-center'>
          Masukkan Password Baru
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <TextInput type='password' label='Password' name='newPassword' />

            <Button
              className='flex w-full justify-center'
              type='submit'
              variant='filled'
              disabled={mutateResetPassword.isLoading}
            >
              Perbarui Password
            </Button>
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
