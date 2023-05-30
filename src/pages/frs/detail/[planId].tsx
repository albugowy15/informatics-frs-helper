import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { Button, LinkButton } from '@/components/Button';
import CounterBadge from '@/components/CounterBadge';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';

export default function PlanDetailPage() {
  const router = useRouter();
  const plan = api.frs.getPlanDetail.useQuery(
    {
      planId: router.query.planId as string,
    },
    {
      enabled: Boolean(router.query.planId),
    }
  );
  const deletePlan = api.frs.deletePlan.useMutation();
  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = (planId: string) => {
    setDeleteModal(false);
    toast.promise(
      deletePlan.mutateAsync({ planId: planId }).then((res) => {
        if (res.id) {
          router.replace('/frs');
        }
      }),
      {
        loading: 'Menghapus Rencana FRS',
        success: 'Rencana FRS Berhasil Dihapus',
        error: (error) => error.message,
      }
    );
  };
  return (
    <>
      <NextSeo title={renderPageTitle('Detail myFRS')} />
      {plan.isLoading ? (
        <div className='flex flex-col items-center justify-center'>
          <Typography variant='label1'>Memuat Informasi Rencana FRS</Typography>
          <Loader />
        </div>
      ) : (
        <>
          {plan.data ? (
            <>
              <section>
                <Typography variant='h4' className='mb-1'>
                  Informasi Plan FRS
                </Typography>
                <Typography variant='body1'>
                  Judul : {plan.data.title}
                </Typography>
                <Typography variant='body1'>
                  Semester : {plan.data.semester}
                </Typography>
                <Typography variant='body1'>
                  Total SKS : {plan.data.totalSks}
                </Typography>
              </section>

              <div className='py-2' />

              <section className='space-y-2'>
                <Typography variant='h4'>Matkul yang diambil</Typography>
                <div className='grid gap-2 lg:grid-cols-4'>
                  {plan.data.Class.map((kelas) => (
                    <div
                      key={kelas.id}
                      className='flex flex-col justify-between gap-2 rounded-md border border-neutral-600 p-2 lg:p-3'
                    >
                      <div>
                        <Typography variant='body1' className='font-medium'>
                          {kelas.Matkul.name} {kelas.code} ({kelas.Matkul.sks}{' '}
                          sks)
                        </Typography>
                        <Typography variant='body2' className='py-0.5'>
                          {kelas.Lecturer.fullname}
                        </Typography>
                        <Typography variant='body2'>
                          {kelas.day}, {kelas.Session.session_time}
                        </Typography>
                        <CounterBadge count={kelas.taken} size='body2' />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <div className='py-2' />
              <div className='flex items-center gap-3'>
                <LinkButton
                  variant='filled'
                  href={'/frs/edit/' + plan.data.id}
                  icon={MdEdit}
                  aria-disabled={deletePlan.isLoading}
                >
                  Ubah
                </LinkButton>
                <Button
                  variant='danger'
                  icon={MdDelete}
                  disabled={deletePlan.isLoading}
                  onClick={() => setDeleteModal(true)}
                >
                  Hapus
                </Button>
              </div>
              {/* Delete Modal */}
              <Modal
                title='Hapus Rencana Ini?'
                isOpen={deleteModal}
                setIsOpen={setDeleteModal}
              >
                <div className='py-2'>
                  <Typography variant='body1'>
                    Apakah kamu yakin ingin menghapus rencana FRS ini?
                  </Typography>
                  <div className='py-3' />
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='danger'
                      onClick={() => handleDeleteModal(plan.data.id)}
                    >
                      Ya, Hapus
                    </Button>
                    <Button
                      variant='outlined'
                      onClick={() => setDeleteModal(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              </Modal>
              {/* End delete Modal */}
            </>
          ) : (
            <Typography variant='body1'>Rencara FRS Tidak ditemukan</Typography>
          )}
        </>
      )}
    </>
  );
}
