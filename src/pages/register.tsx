import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { z } from 'zod';

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
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const methods = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterForm) => {
    toast.promise(axios.post('/api/register', data), {
      loading: 'Silahkan tunggu',
      success: 'Akun berhasil dibuat, silahkan login',
      error: (err) => err.response.data.message,
    });
  };

  return (
    <div className='mx-auto mt-6 w-full rounded-xl border border-neutral-500 p-4 md:w-96 md:p-10'>
      <Typography variant='h2' className='pb-5 text-center'>
        Silahkan Register
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput label='Username' name='username' />
          <TextInput label='Email' name='email' />
          <TextInput type='password' label='Password' name='password' />
          <Button
            className='flex w-full justify-center'
            type='submit'
            variant='filled'
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
      <Toaster />
    </div>
  );
}
