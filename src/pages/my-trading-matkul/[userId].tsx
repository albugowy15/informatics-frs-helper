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
  const utils = api.useContext();
  const router = useRouter();
  const { userId } = router.query;
  const tradeMatkulPosts = api.tradeMatkul.getAllMyTradeMatkul.useQuery(
    {
      userId: userId as string,
    },
    {
      enabled: Boolean(userId),
    }
  );
  const deleteTradeMatkul = api.tradeMatkul.deleteMyTradeMatkul.useMutation({
    onSuccess() {
      utils.tradeMatkul.getAllMyTradeMatkul.invalidate();
    },
  });
  const [confirmModal, setConfirmModal] = useState(false);
  const [postId, setPostId] = useState('');
  function onDeleteTradeMatkul(postId: string) {
    toast.promise(deleteTradeMatkul.mutateAsync({ tradeMatkulId: postId }), {
      loading: 'Menghapus...',
      success: 'Berhasil menghapus',
      error: (err) => err.message,
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
                    className='flex flex-col justify-between rounded-md border border-neutral-600 p-3'
                  >
                    <div>
                      <Typography variant='body1'>
                        <span className='font-medium text-error-500'>Want</span>{' '}
                        : {post.searchMatkul.Matkul.name}{' '}
                        {post.searchMatkul.code}
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
                    </div>
                    <div className='flex justify-end gap-3'>
                      <LinkButton
                        href={'/my-trading-matkul/edit/' + post.id}
                        variant='filled'
                        className={`${deleteTradeMatkul.isLoading} ? 'cursor-not-allowed' : ''`}
                        icon={MdCreate}
                      >
                        Edit
                      </LinkButton>
                      <Button
                        variant='tonal'
                        icon={AiFillDelete}
                        disabled={deleteTradeMatkul.isLoading}
                        onClick={() => {
                          setPostId(post.id);
                          setConfirmModal(true);
                        }}
                      >
                        Hapus
                      </Button>
                    </div>
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
                          onDeleteTradeMatkul(postId);
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
