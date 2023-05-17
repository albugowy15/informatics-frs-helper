import { GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { BsPencilSquare } from 'react-icons/bs';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import BasicLink from '@/components/BasicLink';
import { LinkButton } from '@/components/Button';
import Loader from '@/components/Loader';
import Typography from '@/components/Typography';

export default function FRSPage() {
  const { data } = useSession();
  const plans = api.frs.getAllPlans.useQuery(
    {
      userId: data?.user.id as string,
    },
    { enabled: Boolean(data?.user.id) }
  );
  return (
    <>
      <NextSeo title={renderPageTitle('myFRS')} />
      <main>
        <Typography variant='h3'>My FRS Plan</Typography>
        <Typography variant='body1' className='py-3'>
          Kamu bisa membuat rencana FRS hingga 3 rencana selama satu semester.
          Plan FRS yang telah dibuat akan disimpan selama 1 semester dan akan
          dihapus di semester berikutnya.
        </Typography>
        {plans.isLoading ? (
          <div className='flex flex-col items-center justify-center gap-2'>
            <Typography variant='label1'>Memuat Rencana FRS</Typography>
            <Loader />
          </div>
        ) : (
          <>
            {plans.data ? (
              <>
                <div className='grid gap-2 lg:grid-cols-3'>
                  {plans.data.map((plan) => (
                    <div
                      key={plan.id}
                      className='rounded-md border border-neutral-500 p-4'
                    >
                      <BasicLink
                        href={'/frs/detail/' + plan.id}
                        className='text-xl font-medium hover:text-primary-500'
                      >
                        {plan.title}
                      </BasicLink>
                      <Typography variant='body1'>
                        Semester {plan.semester}
                      </Typography>
                      <Typography variant='body1'>
                        {plan.totalSks} sks
                      </Typography>
                    </div>
                  ))}
                </div>
                <div className='py-3' />
                {plans.data?.length !== 3 ? (
                  <LinkButton
                    variant='tonal'
                    href={'/frs/create/' + data?.user.id}
                    className='my-2'
                    icon={BsPencilSquare}
                  >
                    Buat Rencana baru
                  </LinkButton>
                ) : (
                  <>
                    <Typography variant='body2' className='text-error-500'>
                      Kamu tidak dapat membuat plan baru karena telah mencapai
                      maksimal jumlah plan yang dapat dibuat sebanyak 3
                    </Typography>
                  </>
                )}
              </>
            ) : (
              <Typography variant='body1'>
                Kamu belum membuat rencana apapun untuk semester ini.
              </Typography>
            )}
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
