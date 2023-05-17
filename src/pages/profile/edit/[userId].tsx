import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { prisma } from '@/server/db';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';
import { asOptionalField } from '@/utils/zod';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';

export const EditProfileForm = z.object({
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
  idLine: asOptionalField(
    z.string().startsWith('@', { message: 'Id Line ditulis dengan awalan @' })
  ),
  whatsapp: asOptionalField(
    z
      .string()
      .min(9, { message: 'No. Whatsapp minimal 9 angka' })
      .max(14, { message: 'No. Whatsapp maksima 9 angka' })
      .startsWith('08', { message: 'No. Whatsapp tidak valid' })
      .regex(/^[0-9]*$/, { message: 'No. Whatsapp tidak valid' })
  ),
});

type EditProfileFormType = z.infer<typeof EditProfileForm>;

type UserProfileProps = {
  fullname: string | null;
  username: string;
  email: string;
  idLine: string | null;
  whatsapp: string | null;
};

export default function EditProfilePage({
  userProfile,
}: {
  userProfile: UserProfileProps;
}) {
  const router = useRouter();
  const { userId } = router.query;

  const methods = useForm<EditProfileFormType>({
    resolver: zodResolver(EditProfileForm),

    defaultValues: {
      fullname: userProfile.fullname ?? '',
      username: userProfile.username ?? '',
      email: userProfile.email ?? '',
      idLine: userProfile.idLine ?? '',
      whatsapp: userProfile.whatsapp ?? '',
    },
  });

  const { handleSubmit } = methods;

  const mutation = api.user.updateProfile.useMutation({
    onSuccess: () => {
      router.replace('/profile/' + userId);
    },
  });

  const onSubmit: SubmitHandler<EditProfileFormType> = (data) => {
    toast.promise(
      mutation.mutateAsync({
        id: userId as string,
        content: {
          email: data.email,
          fullname: data.fullname,
          idLine: data.idLine,
          whatsapp: data.whatsapp,
          username: data.username,
        },
      }),
      {
        loading: 'Memperbarui profil...',
        success: 'Profil berhasil diperbarui',
        error: 'Gagal memperbarui profil',
      }
    );
  };

  return (
    <>
      <NextSeo title={renderPageTitle('Edit Profile')} />
      <main className='flex flex-col items-center justify-center gap-5'>
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
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params) {
    return {
      notFound: true,
    };
  }

  const { userId } = context.params;

  if (userId == undefined) {
    return {
      notFound: true,
    };
  }

  const session = await getSession(context);
  if (session == null) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (userId !== session.user.id) {
    return {
      redirect: {
        destination: '/403',
        permanent: false,
      },
    };
  }

  const userProfile = await prisma.user
    .findUnique({
      where: { id: session.user.id },
      select: {
        email: true,
        fullname: true,
        idLine: true,
        username: true,
        whatsapp: true,
      },
    })
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    });

  return {
    props: {
      userProfile,
      session,
    },
  };
}
