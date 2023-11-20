import { Book, Star } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";

import ScheduleStatusAlert from "@/app/_components/schedule-status";
import { renderPageTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: renderPageTitle("Home"),
  description: "Informatics FRS Helper",
};

export default function Home() {
  return (
    <>
      <ScheduleStatusAlert />
      <main className="mt-24 flex flex-col items-center justify-center space-y-2 ">
        <Typography variant="h2" className="text-center">
          Informatics FRS Helper
        </Typography>
        <Typography variant="body1" className="text-center">
          Aplikasi bantuan FRS untuk mahasiswa Informatika ITS
        </Typography>
        <div className="py-1" />
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
          <Button asChild>
            <Link href="/panduan">
              <Book className="mr-2 h-4 w-4" />
              Baca Panduan
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <a href="https://github.com/albugowy15/informatics-frs-helper">
              <Star className="mr-2 h-4 w-4" />
              Star me on GitHub
            </a>
          </Button>
        </div>
      </main>
    </>
  );
}
