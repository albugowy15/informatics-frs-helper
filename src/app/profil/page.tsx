import { Pencil } from 'lucide-react';
import { Metadata } from 'next';

import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';

import { renderPageTitle } from '@/utils/page';

import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: renderPageTitle('Profile'),
};
export default async function ProfilePage() {
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
    <>
      <Card className='w-full min-w-fit sm:w-[500px] mx-auto'>
        <CardHeader>
          <CardTitle>Informasi Profil Akun</CardTitle>
          <CardDescription>
            Berikut adalah informasi lengkap terkait akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography
            variant='body1'
            className='flex items-center justify-between py-2'
          >
            Nama lengkap
            <span className='font-normal text-neutral-300'>
              {userProfile?.fullname}
            </span>
          </Typography>
          <Separator />
          <Typography
            variant='body1'
            className='flex items-center justify-between py-2'
          >
            Username
            <span className='font-normal text-neutral-300'>
              {userProfile?.username}
            </span>
          </Typography>
          <Separator />
          <Typography
            variant='body1'
            className='flex items-center justify-between py-2'
          >
            Email
            <span className='font-normal text-neutral-300'>
              {userProfile?.email}
            </span>
          </Typography>
          <Separator />
          <Typography
            variant='body1'
            className='flex items-center justify-between py-2'
          >
            ID Line
            <span className='font-normal text-neutral-300'>
              {userProfile?.idLine}
            </span>
          </Typography>
          <Separator />
          <Typography
            variant='body1'
            className='flex items-center justify-between py-2'
          >
            No. WA
            <span className='font-normal text-neutral-300'>
              {userProfile?.whatsapp}
            </span>
          </Typography>
          <Separator />
        </CardContent>
        <CardFooter className='flex flex-col'>
          <Button>
            <Pencil className='mr-2 h-4 w-4' />
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
