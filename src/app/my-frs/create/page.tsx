import FrsLayout from "@/app/my-frs/_layout/frs-layout";
import { type SearchParam } from "@/app/my-frs/types";
import { renderPageTitle } from "@/lib/utils";
import { type Metadata } from "next";

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
    <FrsLayout
      params={{
        semester,
        subject,
      }}
    />
  );
}
