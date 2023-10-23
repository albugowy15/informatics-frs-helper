import { get } from '@vercel/edge-config';
import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function ScheduleStatusAlert() {
  const scheduleStatus: string | undefined = await get('schedule');
  return (
    <Alert
      variant={scheduleStatus === 'UPDATED' ? 'default' : 'destructive'}
      className='w-fit mx-auto mt-8'
    >
      <Terminal className='h-4 w-4' />
      <AlertTitle>{scheduleStatus}</AlertTitle>
      <AlertDescription>
        {scheduleStatus === 'UPDATED'
          ? 'Jadwal kelas telah diperbarui, selamat menggunakan!'
          : 'Perhatian! Jadwal kelas belum diperbarui.'}
      </AlertDescription>
    </Alert>
  );
}
