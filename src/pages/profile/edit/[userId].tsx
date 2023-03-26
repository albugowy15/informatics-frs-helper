import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { z } from 'zod';

import { api } from '@/utils/api';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';

const EditProfileForm = z.object({
  fullname: z.string().optional(),
  username: z
    .string()
    .min(6, { message: 'Username minimal 6 karakter' })
    .max(12, { message: 'Username maksimal 12 karakter' })
    .nonempty({
      message: 'Username tidak boleh kosong',
    }),
  email: z
    .string()
    .email({ message: 'Email tidak valid' })
    .nonempty({ message: 'Email tidak boleh kosong' }),
  idLine: z.string().optional(),
  whatsapp: z.string(),
});

type EditProfileFormType = z.infer<typeof EditProfileForm>;

export default function EditProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const userProfile = api.protected.getUserProfile.useQuery(
    {
      id: userId as string,
    },
    { enabled: userId !== undefined }
  );

  const methods = useForm<EditProfileFormType>({
    resolver: zodResolver(EditProfileForm),

    values: {
      fullname: userProfile.data?.fullname ?? '',
      username: userProfile.data?.username ?? '',
      email: userProfile.data?.email ?? '',
      idLine: userProfile.data?.idLine ?? '',
      whatsapp: userProfile.data?.whatsapp ?? '',
    },
  });

  const { handleSubmit } = methods;

  const mutation = api.protected.updateProfile.useMutation();

  const onSubmit: SubmitHandler<EditProfileFormType> = (data) => {
    // toast.loading('Memperbarui profil...');
    toast.promise(
      mutation.mutateAsync({
        id: userId as string,
        email: data.email,
        fullname: data.fullname,
        idLine: data.idLine,
        username: data.username,
        whatsapp: data.whatsapp,
      }),
      {
        loading: 'Memperbarui profil...',
        success: 'Profil berhasil diperbarui',
        error: 'Gagal memperbarui profil',
      }
    );
  };

  return (
    <main className='flex flex-col items-center justify-center gap-5'>
      <Toaster />
      <FormProvider {...methods}>
        <form
          className={clsx(
            [mutation.isLoading ? 'cursor-not-allowed' : 'cursor-default'],
            'flex w-full min-w-fit flex-col gap-3 rounded-lg border border-neutral-700 p-3 sm:w-[400px]'
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            label='Nama lengkap'
            name='fullname'
            placeholder='Contoh : John Doe'
          />
          <TextInput
            label='Username'
            name='username'
            placeholder='Contoh : johndoe'
          />
          <TextInput
            label='Email'
            name='email'
            placeholder='Contoh: johndoe@gmail.com'
          />
          <TextInput
            label='ID Line'
            name='idLine'
            placeholder='Contoh: @johndoe'
          />
          <TextInput
            label='WhatsApp'
            name='whatsapp'
            placeholder='Contoh: 081234567890'
          />
          <Button
            variant='filled'
            type='submit'
            disabled={mutation.isLoading}
            className='mx-auto w-fit'
          >
            Perbarui Profil
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}
