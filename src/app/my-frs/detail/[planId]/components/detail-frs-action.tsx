'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';
import { Loader2, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import { api } from '@/trpc/react';

const DetailFrsAction = ({
  frsTitle,
  planId,
}: {
  frsTitle: string;
  planId: string;
}) => {
  const mutateDeleteFrsPlan = api.frs.deletePlan.useMutation();
  const router = useRouter();
  const handleDeleteFrsPlan = (planId: string) => {
    mutateDeleteFrsPlan
      .mutateAsync({ planId: planId })
      .then((res) => {
        if (res) {
          toast({
            title: 'Success',
            description: 'Berhasil menghapus rencana FRS',
          });
          router.replace('/my-frs');
        }
      })
      .catch((err) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        });
      });
  };
  return (
    <div className='flex items-center gap-3'>
      <Button
        variant='secondary'
        asChild
        disabled={mutateDeleteFrsPlan.isLoading}
      >
        {mutateDeleteFrsPlan.isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Please wait..
          </>
        ) : (
          <Link href={'/my-frs/edit/' + planId}>
            <Pencil className='mr-2 h-4 w-4' />
            Ubah
          </Link>
        )}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive'>
            {mutateDeleteFrsPlan.isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait..
              </>
            ) : (
              <>
                <Trash className='mr-2 h-4 w-4' />
                Hapus
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Anda yakin menghapus plan FRS ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Anda benar-benar yakin ingin menghapus rencana FRS :{' '}
              <span className='text-orange-600 font-bold'>{frsTitle}</span>?
              Tindakan ini akan menghapus rencana FRS tersebut secara permanen
              dari akun Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant='outline'>Batal</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant='destructive'
                disabled={mutateDeleteFrsPlan.isLoading}
                onClick={() => handleDeleteFrsPlan(planId)}
              >
                Ya, Hapus
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DetailFrsAction;