import { Plus } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";

import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: renderPageTitle("myFRS"),
};

export default async function FRSPage() {
  const plans = await api.frs.getAllPlans.query();
  return (
    <main>
      <Typography variant="h3">My FRS Plan</Typography>
      <Typography variant="body1">
        Kamu bisa membuat rencana FRS hingga 3 rencana selama satu semester.
        Plan FRS yang telah dibuat akan disimpan selama 1 semester dan akan
        dihapus di semester berikutnya.
      </Typography>

      {plans.length < 3 ? (
        <Button className="my-6" asChild>
          <Link href="/my-frs/create">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Rencana baru
          </Link>
        </Button>
      ) : (
        <>
          <Typography variant="body1" className="my-4">
            Kamu tidak dapat membuat plan baru karena telah mencapai maksimal
            jumlah plan yang dapat dibuat sebanyak 3
          </Typography>
        </>
      )}

      <div className="grid gap-2 lg:grid-cols-3">
        {plans.length > 0 ? (
          <>
            {plans.map((plan) => (
              <div key={plan.id} className="rounded-md border p-4">
                <Link
                  href={"/my-frs/detail/" + plan.id}
                  className="text-xl font-semibold hover:underline"
                >
                  {plan.title}
                </Link>
                <Typography variant="body1">
                  Semester {plan.semester}
                </Typography>
                <Typography variant="body1">{plan.totalSks} sks</Typography>
              </div>
            ))}
          </>
        ) : (
          <>
            <Typography variant="body1">
              Kamu belum membuat rencana frs
            </Typography>
          </>
        )}
      </div>
    </main>
  );
}
