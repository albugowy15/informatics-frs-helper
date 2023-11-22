import { type Metadata } from "next";

import FrsUi from "@/app/my-frs/_ui/frs-ui";
import { type SearchParam } from "@/app/my-frs/types";
import { renderPageTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: renderPageTitle("Create myFRS"),
};

export default function CreateFRSPage({
  searchParams,
}: {
  searchParams: SearchParam;
}) {
  const { semester = "1", subject = "Semua" } = searchParams;

  return (
    <FrsUi
      params={{
        semester,
        subject,
      }}
    />
  );
}
