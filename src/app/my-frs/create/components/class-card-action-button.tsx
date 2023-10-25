'use client';

import { Button } from '@/components/ui/button';

import { TakenClassType } from '@/app/my-frs/create/components/class-context';

const ClassCardActionButton = ({ data }: { data: TakenClassType }) => {
  /**
   * @todo Add data into classTaken state from parent context
   */
  return <Button variant='secondary'>Ambil</Button>;
};

export default ClassCardActionButton;
