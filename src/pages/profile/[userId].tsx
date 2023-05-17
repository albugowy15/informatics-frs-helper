import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { LinkButton } from '@/components/Button';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';

export default function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const { data } = useSession();
  const userProfile = api.user.getUserProfile.useQuery(
    {
      id: userId as string,
    },
    { enabled: userId !== undefined }
  );
  return (
    <>
      <NextSeo title={renderPageTitle('Profile')} />
      <main className='flex flex-col items-center justify-center gap-5'>
        {userProfile.isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='flex w-full min-w-fit flex-col divide-y divide-neutral-600 rounded-lg border border-neutral-700 p-3 sm:w-[400px]'>
              <Typography
                variant='body2'
                className='flex items-center justify-between py-2.5 font-medium'
              >
                Nama lengkap{' '}
                <span className='font-normal text-neutral-300'>
                  {userProfile.data?.fullname
                    ? userProfile.data?.fullname
                    : '-'}
                </span>
              </Typography>
              <Typography
                variant='body2'
                className='flex items-center justify-between py-2.5 font-medium'
              >
                Username{' '}
                <span className='font-normal text-neutral-300'>
                  {userProfile.data?.username}
                </span>
              </Typography>
              <Typography
                variant='body2'
                className='flex items-center justify-between py-2.5 font-medium'
              >
                Email{' '}
                <span className='font-normal text-neutral-300'>
                  {userProfile.data?.email}
                </span>
              </Typography>
              <Typography
                variant='body2'
                className='flex items-center justify-between py-2.5 font-medium'
              >
                ID Line{' '}
                <span className='font-normal text-neutral-300'>
                  {userProfile.data?.idLine ? userProfile.data?.idLine : '-'}
                </span>
              </Typography>
              <Typography
                variant='body2'
                className='flex items-center justify-between py-2.5 font-medium'
              >
                No. WA{' '}
                <span className='font-normal text-neutral-300'>
                  {userProfile.data?.whatsapp
                    ? userProfile.data?.whatsapp
                    : '-'}
                </span>
              </Typography>
            </div>
            <LinkButton
              href={'/profile/edit/' + data?.user.id}
              variant='filled'
            >
              Edit Profile
            </LinkButton>
          </>
        )}
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

  return {
    props: {},
  };
}
