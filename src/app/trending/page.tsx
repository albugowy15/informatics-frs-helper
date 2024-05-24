import ClassCard from "@/components/class-card";
import Typography from "@/components/typography";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import { unstable_noStore } from "next/cache";

export const metadata: Metadata = {
  title: renderPageTitle("Trending"),
  description: "Top 12 kelas paling banya diambil",
};

export default async function TrendingPage() {
  unstable_noStore();
  const trendingClass = await api.common.getTrendingClasses.query();
  const isTrendingEmpty = trendingClass.length == 0;
  return (
    <>
      <Typography variant="h2" className="text-center">
        Daftar Kelas Paling Banyak Diambil
      </Typography>
      <div className="py-2" />
      {!isTrendingEmpty ? (
        <main className="mx-auto grid gap-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {trendingClass.map((kelas) => (
            <ClassCard
              key={kelas.id}
              data={{
                day: kelas.day,
                sessionTime: kelas.Session?.session_time,
                subjectCode: kelas.code,
                subjectName: kelas.Matkul.name,
                lecturers: kelas.Lecturer,
                taken: kelas.taken,
                sks: kelas.Matkul.sks,
              }}
            />
          ))}
        </main>
      ) : (
        <Typography
          variant="body1"
          className="text-center text-lg font-semibold text-muted-foreground"
        >
          Belum ada kelas trending
        </Typography>
      )}
    </>
  );
}
