import clsx from 'clsx';

import Typography, { TypographyVariants } from '@/components/Typography';

const CounterBadge = ({
  count,
  size,
}: {
  count: number;
  size?: TypographyVariants;
}) => {
  return (
    <Typography variant={size ?? 'body3'}>
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
      kali
    </Typography>
  );
};

export default CounterBadge;
