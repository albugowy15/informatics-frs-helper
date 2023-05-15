import clsx from 'clsx';

import Typography from '@/components/Typography';

const CounterBadge = ({ count }: { count: number }) => {
  return (
    <Typography variant='body3'>
      Diambil{' '}
      <span
        className={clsx(
          [
            count <= 10 && 'text-green-600',
            count >= 11 && count <= 20 && 'text-yellow-500',
            count >= 21 && 'text-error-400',
          ],
          'font-medium'
        )}
      >
        {count}
      </span>{' '}
      mahasiswa
    </Typography>
  );
};

export default CounterBadge;
