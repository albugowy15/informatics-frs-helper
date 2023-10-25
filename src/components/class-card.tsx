import React from 'react';

import Typography, { TypographyVariants } from '@/components/typography';

import { cn } from '@/lib/utils';

export type ClassCardProps = {
  data: {
    subjectName: string;
    subjectCode: string;
    lecturers: { id: string; fullname: string }[];
    day?: string | null;
    sessionTime?: string | null;
    taken: number;
    sks: number;
  };
  children?: React.ReactNode;
};

const CounterBadge = ({
  count,
  size,
}: {
  count: number;
  size?: TypographyVariants;
}) => {
  return (
    <Typography variant={size ?? 'label1'} className='pt-1'>
      Diambil{' '}
      <span
        className={cn(
          [
            count <= 10 && 'text-green-600',
            count >= 11 && count <= 20 && 'text-yellow-500',
            count >= 21 && 'text-red-600',
          ],
          'font-medium',
        )}
      >
        {count}
      </span>{' '}
      kali
    </Typography>
  );
};

export const ClassCard = ({ data, children }: ClassCardProps) => {
  return (
    <div className='rounded-md border p-2 lg:p-3 space-y-1'>
      <Typography variant='body1' className='font-medium'>
        {data.subjectName} {data.subjectCode} ({data.sks} sks)
      </Typography>
      {data.lecturers.map((lecturer) => (
        <Typography variant='label1' className='font-normal' key={lecturer.id}>
          {lecturer.fullname}
        </Typography>
      ))}
      {data.day != null && data.sessionTime != null ? (
        <Typography variant='label1' className='font-normal'>
          {data.day}, {data.sessionTime} WIB
        </Typography>
      ) : null}

      <CounterBadge count={data.taken} />
      <div className='py-1' />
      {children}
    </div>
  );
};

export default ClassCard;
