"use client";

import { requiredSemesterStringSchema } from "@/lib/schema";
import { matkulSchema } from "../schema";
import { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";

const takeClassSchema = z.object({
  semester: requiredSemesterStringSchema,
  matkul: matkulSchema,
});

type TakeClassFormType = z.infer<typeof takeClassSchema>;

function useTakeSubjectForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(takeClassSchema),
    defaultValues: {
      matkul: searchParams?.get("subject") ?? "Semua",
      semester: searchParams?.get("semester") ?? "1",
    },
  });
  const semesterWatch = useWatch({ control: form.control, name: "semester" });

  const listSubjects = api.common.getSubject.useQuery({
    semester: parseInt(semesterWatch),
    withAll: true,
  });

  const onSubmit: SubmitHandler<TakeClassFormType> = (data) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("semester", data.semester);
    newParams.set("subject", data.matkul ?? "Semua");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return { listSubjects, onSubmit, form };
}

export { useTakeSubjectForm };
