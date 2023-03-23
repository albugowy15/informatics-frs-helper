import { useSession } from 'next-auth/react';
import { BsPencilSquare } from 'react-icons/bs';

import { LinkButton } from '@/components/Button';
import Typography from '@/components/Typography';

export default function FRSPage() {
  const { data } = useSession();
  return (
    <main>
      <Typography variant='h3'>My FRS Plan</Typography>
      <Typography variant='body1' className='py-3'>
        Kamu bisa membuat rencana FRS hingga 3 rencana selama satu semester.
        Plan FRS yang telah dibuat akan disimpan selama 1 semester dan akan
        dihapus di semester berikutnya.
      </Typography>
      <Typography variant='body1'>
        Kamu belum membuat rencana apapun untuk semester ini.
      </Typography>
      <LinkButton
        variant='tonal'
        href={'/frs/create/' + data?.user.id}
        className='my-2'
        icon={BsPencilSquare}
      >
        Buat Rencana baru
      </LinkButton>
    </main>
  );
}
