import { NextSeo } from 'next-seo';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { LinkButton } from '@/components/Button';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';

export default function ProfilePage() {
  const userProfile = api.user.getUserProfile.useQuery();
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
            <LinkButton href='/profile/edit' variant='filled'>
              Edit Profile
            </LinkButton>
          </>
        )}
      </main>
    </>
  );
}
