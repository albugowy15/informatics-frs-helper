import { api } from '@/utils/api';

import { ClassCard } from '@/components/Card';
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
              {popularClasses.data.length > 0 ? (
                <>
                  <Typography variant='h2' className='text-center'>
                    Top 10 Kelas Paling Banyak Diambil
                  </Typography>
                  <div className='py-2' />
                  <main className='mx-auto flex max-w-lg flex-col gap-2'>
                    {popularClasses.data.map((kelas) => (
                      <ClassCard
                        key={kelas.id}
                        data={{
                          day: kelas.day,
                          sessionTime: kelas.Session.session_time,
                          subjectCode: kelas.code,
                          subjectName: kelas.Matkul.name,
                          lecturers: kelas.Lecturer,
                          taken: kelas.taken,
                        }}
                      />
                    ))}
                  </main>
                </>
              ) : (
                <div className='flex items-center justify-center'>
                  <Typography variant='body1'>Tidak ada data kelas</Typography>
                </div>
              )}
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
