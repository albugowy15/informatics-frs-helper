import { type Metadata } from "next";

import FrsUi from "@/app/my-frs/_ui/frs-ui";
import { type SearchParam } from "@/app/my-frs/_types";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: renderPageTitle("Edit myFRS"),
};

export default async function EditFrsPage({
  params,
  searchParams,
}: {
  params: { planId: string };
  searchParams: SearchParam;
}) {
  const planDetail = await api.frs.getPlanDetail.query({
    planId: params.planId,
  });
  const { semester = "1", subject = "Semua" } = searchParams;

  return (
    <>
      <FrsUi
        params={{ semester, subject }}
        planDetail={planDetail}
        planId={params.planId}
      />
    </>
  );
}
