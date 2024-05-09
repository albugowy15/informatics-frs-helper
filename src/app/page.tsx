import { ScheduleStatusAlert } from "@/app/_components/schedule-status";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { renderPageTitle } from "@/lib/utils";
import { ArrowRightIcon, ReaderIcon, StarIcon } from "@radix-ui/react-icons";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: renderPageTitle("Home"),
  description: "Informatics FRS Helper",
};

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-6">
        <ScheduleStatusAlert />
        <a
          href="https://api-informatics-frs-helper.fly.dev"
          target="_blank"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          🎉
          <span className="ml-3">Informatics FRS Helper Public API</span>
          <ArrowRightIcon className="ml-1" />
        </a>
      </section>
      <main className="mt-10 flex flex-col items-center justify-center space-y-2 ">
        <Typography variant="h1" className="text-center">
          Informatics FRS Helper
        </Typography>
        <Typography variant="body1" className="text-center text-lg">
          Aplikasi bantuan FRS untuk mahasiswa Informatika ITS
        </Typography>
        <div className="py-1" />
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
          <Button asChild>
            <Link href="/panduan">
              <ReaderIcon className="mr-2 h-4 w-4" />
              Baca Panduan
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <a href="https://github.com/albugowy15/informatics-frs-helper">
              <StarIcon className="mr-2 h-4 w-4" />
              Star me on GitHub
            </a>
          </Button>
        </div>
      </main>
    </>
  );
}
