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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ScheduleFilterForm from "@/app/jadwal/_components/schedule-filter-form";
import { renderPageTitle } from "@/lib/utils";
import ClassAccordion from "./_components/class-accordion";
import Loader from "@/components/loader";
import React from "react";

export const metadata: Metadata = {
  title: renderPageTitle("Informasi Jadwal"),
  description: "Informasi Jadwal Mata Kuliah Informatika ITS",
};

export type SearchParam = {
  semester: string;
  subject: string;
};

export default function SchedulePage({
  searchParams,
}: {
  searchParams: SearchParam;
}) {
  const { semester = "1", subject = "Semua" } = searchParams;

  return (
    <>
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
              <ScheduleFilterForm />
            </CardContent>
          </Card>
        </aside>
        <section className="mb-7 flex flex-col lg:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Jadwal</DialogTitle>
                <DialogDescription>
                  Silahkan filter jadwal berdasarkan semester dan mata kuliah
                </DialogDescription>
              </DialogHeader>
              <div className="overflow-scroll px-2 py-3">
                <ScheduleFilterForm />
              </div>
            </DialogContent>
          </Dialog>
        </section>
        <main className="flex w-full flex-col gap-3 lg:px-3">
          <React.Suspense fallback={<Loader message="Memfilter jadwal" />}>
            <ClassAccordion semester={semester} subject={subject} />
          </React.Suspense>
        </main>
      </div>
    </>
  );
}
