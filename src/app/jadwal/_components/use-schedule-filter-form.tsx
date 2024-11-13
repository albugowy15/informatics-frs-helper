"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { filterSchema } from "../schema";
import { type z } from "zod";
import { parseSemester } from "@/lib/utils";
import { trpc } from "@/trpc/client";

type FilterForm = z.infer<typeof filterSchema>;

function useScheduleFilterForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      matkul: searchParams?.get("subject") ?? "Semua",
      semester: searchParams?.get("semester") ?? "1",
    },
  });
  const semesterWatch = useWatch({ control: form.control, name: "semester" });

  const listSubjects = trpc.common.getSubject.useQuery({
    semester: parseSemester(semesterWatch),
    withAll: true,
  });
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("semester", data.semester);
    newParams.set("subject", data.matkul ?? "Semua");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return {
    form,
    listSubjects,
    onSubmit,
  };
}

export { useScheduleFilterForm };
