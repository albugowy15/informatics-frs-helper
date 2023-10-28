import { type Metadata } from "next";

import FrsUi from "@/app/my-frs/_ui/frs-ui";
import { type SearchParam } from "@/app/my-frs/types";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: renderPageTitle("Create myFRS"),
};

export default async function CreateFRSPage({
  searchParams,
}: {
  searchParams: SearchParam;
}) {
  const { semester = undefined, subject = undefined } = searchParams;
  const classes = await api.common.getClass.query({
    semester: semester === undefined ? parseInt("0") : parseInt(semester),
    matkul: subject === "Semua" || subject === undefined ? undefined : subject,
    with_taken: true,
  });

  return <FrsUi classes={classes} />;
}
