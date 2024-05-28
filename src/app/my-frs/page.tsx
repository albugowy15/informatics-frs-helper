import Typography from "@/components/typography";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import { unstable_noStore } from "next/cache";
import CreateFrsButton from "./_components/create-frs-button";
import FrsPlanCard from "./_components/frs-plan-card";

export const metadata: Metadata = {
  title: renderPageTitle("myFRS"),
};

export default async function FRSPage() {
  unstable_noStore();
  const plans = await api.frs.getAllPlans();
  return (
    <main>
      <Typography variant="h3">My FRS Plan</Typography>
      <Typography variant="body1">
        Kamu bisa membuat rencana FRS hingga 3 rencana selama satu semester.
        Plan FRS yang telah dibuat akan disimpan selama 1 semester dan akan
        dihapus di semester berikutnya.
      </Typography>
      <CreateFrsButton isReachFRSLimit={plans.length >= 3} />
      <div className="grid gap-2 lg:grid-cols-3">
        {plans.length > 0 ? (
          plans.map((plan) => <FrsPlanCard plan={plan} key={plan.id} />)
        ) : (
          <Typography variant="body1">
            Kamu belum membuat rencana frs
          </Typography>
        )}
      </div>
    </main>
  );
}
