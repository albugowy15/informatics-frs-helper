import * as React from "react";
import { ClassAccordion } from "@/app/_components/class-accordion";
import ClassContextProvider from "@/app/my-frs/_components/class-context";
import FRSForm from "@/app/my-frs/_components/frs-form";
import TakeClassForm from "@/app/my-frs/_components/take-subject-form";
import { type FrsLayoutProps } from "@/app/my-frs/types";
import Loader from "@/components/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function FrsLayout(props: FrsLayoutProps) {
  return (
    <main className="relative mt-4 flex flex-col gap-2 lg:flex-row">
      <ClassContextProvider planDetailClass={props.planDetail?.Class}>
        <aside className="lg:sticky lg:top-4 lg:max-h-screen lg:w-[30%] lg:shrink-0 lg:overflow-y-auto lg:pr-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Plan FRS</CardTitle>
              <CardDescription>
                Informasi judul, semester, dan kelas yang akan kamu ambil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FRSForm planId={props.planId} planDetail={props.planDetail} />
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
                <React.Suspense
                  fallback={<Loader message="Memfilter jadwal" />}
                >
                  <ClassAccordion
                    withAction
                    semester={props.params.semester}
                    subject={props.params.subject}
                  />
                </React.Suspense>
              </div>
            </CardContent>
          </Card>
        </section>
      </ClassContextProvider>
    </main>
  );
}

export { FrsLayout };
