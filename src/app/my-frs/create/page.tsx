import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import { SearchParam } from '@/app/my-frs/type';
import FrsUi from '@/app/my-frs/ui/frs-ui';
import { api } from '@/trpc/server';

export const metadata: Metadata = {
  title: renderPageTitle('Create myFRS'),
};

export default async function CreateFRSPage({
  searchParams,
}: {
  searchParams: SearchParam;
}) {
  const { semester = undefined, subject = undefined } = searchParams;
  const classes = await api.common.getClass.query({
    semester: semester === undefined ? parseInt('0') : parseInt(semester),
    matkul: subject === 'Semua' || subject === undefined ? undefined : subject,
    with_taken: true,
  });

  return (
    <>
      <FrsUi classes={classes} />
    </>
  );
}
