"use client";

import { parseSemester } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const filterSchema = z.object({
  semester: z.string().optional(),
  matkul: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

function useTradingFilterForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      matkul: searchParams?.get("subject") ?? "",
      semester: searchParams?.get("semester") ?? "",
    },
  });
  const semesterWatch = useWatch({ control: form.control, name: "semester" });

  const listSubjects = api.common.getSubject.useQuery(
    {
      semester: parseSemester(semesterWatch ?? ""),
      withAll: true,
    },
    { enabled: semesterWatch !== undefined },
  );
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("semester", data.semester ?? "");
    newParams.set("subject", data.matkul ?? "all");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return { listSubjects, form, onSubmit };
}

export { useTradingFilterForm };
