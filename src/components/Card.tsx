import React from 'react';

import CounterBadge from '@/components/CounterBadge';
import Typography from '@/components/Typography';

type ClassCardProps = {
  data: {
    subjectName: string;
    subjectCode: string;
    lecturers: { id: string; fullname: string }[];
    day: string;
    sessionTime: string;
    taken: number;
    sks?: number;
  };
  action?: React.ReactNode;
};
export const ClassCard = ({ data, action }: ClassCardProps) => {
  return (
    <div className='rounded-md border border-neutral-600 p-2 lg:p-3'>
      <Typography variant='body2' className='font-medium'>
        {data.subjectName} {data.subjectCode} ({data.sks} sks)
      </Typography>
      {data.lecturers.map((lecturer) => (
        <Typography variant='body3' className='py-0.5' key={lecturer.id}>
          {lecturer.fullname}
        </Typography>
      ))}
      <Typography variant='body3'>
        {data.day}, {data.sessionTime} WIB
      </Typography>

      <CounterBadge count={data.taken} />

      {action}
    </div>
  );
};
