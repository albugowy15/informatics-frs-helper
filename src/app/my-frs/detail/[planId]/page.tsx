import DetailFrsAction from "@/app/my-frs/detail/[planId]/_components/detail-frs-action";
import ClassCard from "@/components/class-card";
import Typography from "@/components/typography";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: renderPageTitle("Detail myFRS"),
};

export default async function PlanDetailPage(props: {
  params: Promise<{ planId: string }>;
}) {
  const params = await props.params;
  const plan = await api.frs.getPlanDetail({
    planId: params.planId,
  });

  if (!plan)
    return <Typography variant="body1">Rencara FRS Tidak ditemukan</Typography>;

  return (
    <>
      <section>
        <Typography variant="h4" className="mb-1">
          Informasi Plan FRS
        </Typography>
        <Typography variant="body1">Judul : {plan.title}</Typography>
        <Typography variant="body1">Semester : {plan.semester}</Typography>
        <Typography variant="body1">Total SKS : {plan.totalSks}</Typography>
      </section>

      <div className="py-2" />

      <section className="space-y-2">
        <Typography variant="h4">Matkul yang diambil</Typography>
        <div className="grid gap-2 lg:grid-cols-4">
          {plan.Class.map((kelas) => (
            <ClassCard
              key={kelas.id}
              data={{
                subjectCode: kelas.code,
                subjectName: kelas.Matkul.name,
                sks: kelas.Matkul.sks,
                lecturers: kelas.Lecturer,
                day: kelas.day,
                sessionTime: kelas.Session?.session_time,
                taken: kelas.taken,
              }}
            />
          ))}
        </div>
      </section>
      <div className="py-2" />
      <DetailFrsAction frsTitle={plan.title} planId={plan.id} key={plan.id} />
    </>
  );
}
