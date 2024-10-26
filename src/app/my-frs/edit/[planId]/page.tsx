import { FrsLayout } from "@/app/my-frs/_layout/frs-layout";
import { type SearchParam } from "@/app/my-frs/types";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: renderPageTitle("Edit myFRS"),
};

export default async function EditFrsPage(props: {
  params: Promise<{ planId: string }>;
  searchParams: Promise<SearchParam>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const planDetail = await api.frs.getPlanDetail({
    planId: params.planId,
  });
  const { semester = "1", subject = "Semua" } = searchParams;

  return (
    <FrsLayout
      params={{ semester, subject }}
      planDetail={planDetail}
      planId={params.planId}
    />
  );
}
