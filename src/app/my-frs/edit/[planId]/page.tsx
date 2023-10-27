import { Metadata } from 'next';

import FrsUi from '@/app/my-frs/_ui/frs-ui';
import { SearchParam } from '@/app/my-frs/types';
import { renderPageTitle } from '@/lib/utils';
import { api } from '@/trpc/server';

export const metadata: Metadata = {
  title: renderPageTitle('Edit myFRS'),
};

export default async function EditFrsPage({
  params,
  searchParams,
}: {
  params: { planId: string };
  searchParams: SearchParam;
}) {
  const { semester = undefined, subject = undefined } = searchParams;
  const classes = await api.common.getClass.query({
    semester: semester === undefined ? parseInt('0') : parseInt(semester),
    matkul: subject === 'Semua' || subject === undefined ? undefined : subject,
    with_taken: true,
  });
  const planDetail = await api.frs.getPlanDetail.query({
    planId: params.planId,
  });

  return (
    <>
      <FrsUi classes={classes} planDetail={planDetail} planId={params.planId} />
    </>
  );
}
