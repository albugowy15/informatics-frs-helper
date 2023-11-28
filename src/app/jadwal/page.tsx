import { SlidersHorizontal } from "lucide-react";
import { type Metadata } from "next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ScheduleFilterForm from "@/app/jadwal/_components/schedule-filter-form";
import { renderPageTitle } from "@/lib/utils";
import ClassAccordion from "./_components/class-accordion";
import Loader from "@/components/loader";
import React from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Typography from "@/components/typography";

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
      <aside className="sticky top-4 hidden h-fit w-[26%] flex-shrink-0 lg:block">
        <Card>
          <CardHeader>
            <CardTitle>Filter Jadwal</CardTitle>
            <CardDescription>
              Silahkan filter jadwal berdasarkan semester dan mata kuliah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScheduleFilterForm
              submitAction={<Button type="submit">Tampilkan Jadwal</Button>}
            />
          </CardContent>
        </Card>
      </aside>
      <section className="mb-7 flex items-center justify-between lg:hidden">
        <Typography variant="h4">Jadwal Kelas</Typography>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filter Jadwal</h4>
                <p className="text-sm text-muted-foreground">
                  Silahkan filter jadwal berdasarkan semester dan mata kuliah
                </p>
              </div>
              <div className="grid gap-2">
                <ScheduleFilterForm
                  submitAction={
                    <PopoverClose asChild>
                      <Button type="submit">Tampilkan Jadwal</Button>
                    </PopoverClose>
                  }
                />
              </div>
            </div>
            <div className="overflow-scroll px-2 py-3"></div>
          </PopoverContent>
        </Popover>
      </section>
      <main className="flex w-full flex-col gap-3 lg:px-3">
        <React.Suspense fallback={<Loader message="Memfilter jadwal" />}>
          <ClassAccordion semester={semester} subject={subject} />
        </React.Suspense>
      </main>
    </div>
  );
}
