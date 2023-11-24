"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";
import { type z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SemesterWithKey } from "@/config/contants";
import { api } from "@/trpc/react";
import { filterSchema } from "../schema";

type FilterForm = z.infer<typeof filterSchema>;

const ScheduleFilterForm = ({
  submitAction,
}: {
  submitAction?: React.ReactNode;
}) => {
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

  const listSubjects = api.common.getSubject.useQuery({
    semester: parseInt(semesterWatch),
    withAll: true,
  });
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("semester", data.semester);
    newParams.set("subject", data.matkul ?? "Semua");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih semester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SemesterWithKey.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="matkul"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mata Kuliah</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Mata kuliah" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listSubjects.data ? (
                    <>
                      {listSubjects.data.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </>
                  ) : null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitAction}
      </form>
    </Form>
  );
};

export default ScheduleFilterForm;
