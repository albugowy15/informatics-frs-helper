import { Loader2 } from 'lucide-react';

import Typography from '@/components/typography';

export default function Loading() {
  return (
    <>
      <div className='mt-28 flex flex-col justify-center items-center gap-2'>
        <Typography variant='body1'>Please wait...</Typography>
        <Loader2 className='h-10 w-10 animate-spin' />
      </div>
    </>
  );
}
