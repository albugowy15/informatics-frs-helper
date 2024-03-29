"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { requiredSemesterStringSchema } from "@/lib/schema";
import { api } from "@/trpc/react";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
import { matkulSchema } from "../schema";

const takeClassSchema = z.object({
  semester: requiredSemesterStringSchema,
  matkul: matkulSchema,
});

type TakeClassFormType = z.infer<typeof takeClassSchema>;

const TakeClassForm = () => {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 lg:flex-row lg:items-end"
      >
        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem className="lg:w-1/3">
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
            <FormItem className="lg:w-1/3">
              <FormLabel>Mata Kuliah</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Mata kuliah" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listSubjects.data
                    ? listSubjects.data.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="outline" className="w-fit">
          <MixerVerticalIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </form>
    </Form>
  );
};

export default TakeClassForm;
