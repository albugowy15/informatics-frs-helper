import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai';
import { MdCreate } from 'react-icons/md';

import { api } from '@/utils/api';

import { Button, LinkButton } from '@/components/Button';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';

export default function MyTradeMatkulPage() {
  const router = useRouter();
  const { userId } = router.query;
  const tradeMatkulPosts = api.protected.getAllMyTradeMatkul.useQuery({
    userId: userId as string,
  });
  const deleteTradeMatkul = api.protected.deleteMyTradeMatkul.useMutation();
  const [confirmModal, setConfirmModal] = useState(false);
  function onDeleteTradeMatkul(postId: string) {
    toast.promise(deleteTradeMatkul.mutateAsync({ tradeMatkulId: postId }), {
      loading: 'Menghapus...',
      success: 'Berhasil menghapus',
      error: 'Gagal menghapus',
    });
  }
  return (
    <>
      <Toaster />
      <div className='flex items-center gap-7'>
        <Typography variant='h4'>List My Trade Matkul</Typography>
        <LinkButton
          href={'/my-trading-matkul/create/' + userId}
          variant='outlined'
          icon={MdCreate}
        >
          Tambah Baru
        </LinkButton>
      </div>
      {tradeMatkulPosts.isLoading && (
        <div className='flex w-full justify-center py-5'>
          <Loader />
        </div>
      )}
      {tradeMatkulPosts.isError && (
        <Typography variant='body1' className='text-error-500'>
          {tradeMatkulPosts.error?.message}
        </Typography>
      )}
      {tradeMatkulPosts.isSuccess && (
        <>
          {tradeMatkulPosts.data.length > 0 ? (
            <main className='grid gap-2 py-4 md:grid-cols-2 lg:grid-cols-4'>
              {tradeMatkulPosts.data?.map((post) => (
                <>
                  <div
                    key={post.id}
                    className='flex flex-col rounded-md border border-neutral-600 p-3 hover:cursor-pointer hover:bg-neutral-900'
                    onClick={() =>
                      router.push('/my-trading-matkul/edit/' + post.id)
                    }
                  >
                    <Typography variant='body1'>
                      <span className='font-medium text-error-500'>Want</span> :{' '}
                      {post.searchMatkul.Matkul.name} {post.searchMatkul.code}
                    </Typography>
                    <Typography variant='body1'>
                      <span className='font-medium text-secondary-500'>
                        Have
                      </span>{' '}
                      : {post.hasMatkul.Matkul.name} {post.hasMatkul.code}
                    </Typography>
                    <Typography variant='body2' className='py-3'>
                      {post.description}
                    </Typography>

                    <Button
                      variant='tonal'
                      icon={AiFillDelete}
                      disabled={deleteTradeMatkul.isLoading}
                      className='self-end'
                      onClick={() => setConfirmModal(true)}
                    >
                      Hapus
                    </Button>
                  </div>
                  <Modal
                    title='Yakin ingin menghapus trade matkul ini?'
                    isOpen={confirmModal}
                    setIsOpen={setConfirmModal}
                  >
                    <Typography variant='body1' className='py-2'>
                      Kamu yakin ingin menghapus post trade matkul ini?
                    </Typography>
                    <div className='mt-7 flex items-center justify-end gap-4'>
                      <Button
                        variant='filled'
                        onClick={() => {
                          onDeleteTradeMatkul(post.id);
                          tradeMatkulPosts.refetch();
                          setConfirmModal(false);
                        }}
                      >
                        Hapus
                      </Button>
                      <Button
                        variant='outlined'
                        onClick={() => setConfirmModal(false)}
                      >
                        Batal
                      </Button>
                    </div>
                  </Modal>
                </>
              ))}
            </main>
          ) : (
            <Typography
              variant='h5'
              className='py-5 text-center font-medium text-neutral-500'
            >
              Kamu belum melakukan trade matkul sama sekali
            </Typography>
          )}
        </>
      )}
    </>
  );
}
