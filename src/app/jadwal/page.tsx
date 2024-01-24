import { type Metadata } from "next";

import { renderPageTitle } from "@/lib/utils";
import ClassAccordion from "../_components/class-accordion";
import Loader from "@/components/loader";
import React from "react";
import ScheduleFilterWidget from "./_components/schedule-filter-widget";

export const metadata: Metadata = {
  title: renderPageTitle("Informasi Jadwal"),
  description: "Informasi Jadwal Mata Kuliah Informatika ITS",
};

export interface SearchParam {
  semester: string;
  subject: string;
}

export default function SchedulePage({
  searchParams,
}: {
  searchParams: SearchParam;
}) {
  const { semester = "1", subject = "Semua" } = searchParams;

  return (
    <div className="mt-4 gap-4 lg:flex">
      <ScheduleFilterWidget />
      <main className="flex w-full flex-col gap-3 lg:px-3">
        <React.Suspense fallback={<Loader message="Memfilter jadwal" />}>
          <ClassAccordion semester={semester} subject={subject} />
        </React.Suspense>
      </main>
    </div>
  );
}
