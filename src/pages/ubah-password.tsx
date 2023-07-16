import { zodResolver } from '@hookform/resolvers/zod';
import { NextSeo } from 'next-seo';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

const changePasswordForm = z.object({
  old_password: z.string({
    required_error: 'Password lama tidak boleh kosong',
  }),
  new_password: z
    .string({ required_error: 'Password baru tidak boleh kosong' })
    .min(8)
    .max(16),
});

type CreatePasswordForm = z.infer<typeof changePasswordForm>;
export default function ChangePasswordPage() {
  const methods = useForm<CreatePasswordForm>({
    resolver: zodResolver(changePasswordForm),
  });
  const { handleSubmit } = methods;
  const mutatePassword = api.user.changePassword.useMutation();
  const onSubmit: SubmitHandler<CreatePasswordForm> = (data) => {
    toast.promise(
      mutatePassword.mutateAsync({
        new_password: data.new_password,
        old_password: data.old_password,
      }),
      {
        success: 'Password berhasil diubah',
        loading: 'Mengubah password..',
        error: (error) => error.message,
      },
    );
  };
  return (
    <>
      <NextSeo title={renderPageTitle('Ubah Password')} />
      <div className='mx-auto mt-6 w-full rounded-xl border border-neutral-500 p-4 md:w-96 md:p-10'>
        <Typography variant='h5' className='pb-5 text-center'>
          Silahkan Ubah Password Anda
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <TextInput
              label='Password lama'
              name='old_password'
              type='password'
            />
            <TextInput
              type='password'
              label='Password baru'
              name='new_password'
            />

            <Button
              className='flex w-full justify-center'
              type='submit'
              variant='filled'
              disabled={mutatePassword.isLoading}
            >
              Ubah Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
