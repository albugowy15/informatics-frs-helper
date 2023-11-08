import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClassContextProvider from "@/app/my-frs/_components/class-context";
import TakeClassForm from "@/app/my-frs/_components/take-subject-form";
import { type FrsUiProps } from "@/app/my-frs/_types";
import { Suspense } from "react";
import Loader from "@/components/loader";
import ClassAccordion from "../_components/class-accordion";
import FRSForm from "@/app/my-frs/_components/frs-form";

const FrsUi = ({ planDetail, planId, params }: FrsUiProps) => {
  return (
    <main className="relative mt-4 flex flex-col gap-2 lg:flex-row">
      <ClassContextProvider planDetailClass={planDetail?.Class}>
        <aside className="lg:sticky lg:top-4 lg:max-h-screen lg:w-[30%] lg:flex-shrink-0 lg:overflow-y-auto lg:pr-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Plan FRS</CardTitle>
              <CardDescription>
                Informasi judul, semester, dan kelas yang akan kamu ambil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FRSForm planId={planId} planDetail={planDetail} />
            </CardContent>
          </Card>
        </aside>
        <section className="flex w-full flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Form Ambil Matkul</CardTitle>
            </CardHeader>
            <CardContent>
              <TakeClassForm />

              <div className="mt-3">
                <Suspense fallback={<Loader message="Memfilter jadwal" />}>
                  <ClassAccordion
                    semester={params.semester}
                    subject={params.subject}
                  />
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </section>
      </ClassContextProvider>
    </main>
  );
};

export default FrsUi;
