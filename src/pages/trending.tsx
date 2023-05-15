import { api } from '@/utils/api';

import Loader from '@/components/Loader';
import Typography from '@/components/Typography';

export default function TrendingPage() {
  const popularClasses = api.common.getTrendingClasses.useQuery();
  return (
    <>
      {popularClasses.isLoading ? (
        <div className='flex flex-col items-center justify-center text-center'>
          <Typography variant='body1' className='font-medium'>
            Memuat kelas paling trending
          </Typography>
          <div className='py-1' />
          <Loader />
        </div>
      ) : (
        <>
          {popularClasses.isSuccess ? (
            <>
              {popularClasses.data ? (
                <>
                  <Typography variant='h2' className='text-center'>
                    Top 10 Kelas Paling Banyak Diambil
                  </Typography>
                  <div className='py-2' />
                  <main className='mx-auto flex max-w-lg flex-col gap-2'>
                    {popularClasses.data.map((kelas) => (
                      <div
                        key={kelas.id}
                        className='rounded-md border border-slate-500 p-3'
                      >
                        <Typography variant='body1' className='font-bold'>
                          {kelas.Matkul.name} {kelas.code}
                        </Typography>
                        <Typography variant='body2'>
                          {kelas.day}, {kelas.Session.session_time}
                        </Typography>
                        <Typography variant='body2'>
                          {kelas.Lecturer.fullname}
                        </Typography>
                        <Typography variant='body2' className='pt-2'>
                          Diambil{' '}
                          <span className='font-bold text-error-500'>
                            {kelas.taken}
                          </span>{' '}
                          kali
                        </Typography>
                      </div>
                    ))}
                  </main>
                </>
              ) : null}
            </>
          ) : (
            <div className='flex items-center justify-center'>
              <Typography variant='body1'>Tidak ada data kelas</Typography>
            </div>
          )}
        </>
      )}
    </>
  );
}
