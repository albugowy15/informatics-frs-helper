import { Metadata } from 'next';

import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import EditProfileForm from '@/app/profil/edit/_components/edit-profile-form';
import { renderPageTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: renderPageTitle('Edit Profil'),
};

export default async function EditProfilePage() {
  const session = await getServerAuthSession();
  const userProfile = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: {
      email: true,
      fullname: true,
      idLine: true,
      username: true,
      whatsapp: true,
    },
  });

  return (
    <Card className='w-full min-w-fit sm:w-[500px] mx-auto'>
      <CardHeader>
        <CardTitle>Edit Profil Akun</CardTitle>
        <CardDescription>Silahkan edit profil akun Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <EditProfileForm userProfile={userProfile!} />
      </CardContent>
    </Card>
  );
}
