import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

const forgetPasswordForm = z.object({
  email: z
    .string({
      required_error: 'Email tidak boleh kosong',
    })
    .email({ message: 'Email tidak valid' }),
});

type ForgetPasswordForm = z.infer<typeof forgetPasswordForm>;

export default function ForgetPasswordPage() {
  // const { data: session } = useSession();
  const methods = useForm<ForgetPasswordForm>({
    resolver: zodResolver(forgetPasswordForm),
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<ForgetPasswordForm> = () => {
    return;
  };
  return (
    <>
      <Toaster />
      <div className='mx-auto mt-6 w-full rounded-xl border border-neutral-500 p-4 md:w-96 md:p-10'>
        <Typography variant='h5' className='text-center'>
          Masukkan Email Yang Terdaftar
        </Typography>
        <Typography variant='body2' className='pb-5 text-center'>
          Link untuk reset password akan dikirimkan ke email. Cek folder spam
          jika tidak ada di inbox.
        </Typography>
        <Toaster />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <TextInput label='Email' name='email' />

            <Button
              className='flex w-full justify-center'
              type='submit'
              variant='filled'
            >
              Reset Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
