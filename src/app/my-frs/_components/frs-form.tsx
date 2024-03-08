"use client";

import { useClassContext } from "@/app/my-frs/_components/class-context";
import { type PlanDetailProps } from "@/app/my-frs/types";
import ClassCard from "@/components/class-card";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SemesterWithKey } from "@/config/contants";
import { useToastMutate } from "@/lib/hooks";
import { requiredSemesterStringSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createPlanAction, updatePlanAction } from "../actions";
import { titleSchema } from "../schema";

const createFRSFormSchema = z.object({
  title: titleSchema,
  semester: requiredSemesterStringSchema,
});

type CreateFRSFormType = z.infer<typeof createFRSFormSchema>;

const FRSForm = (props: { planDetail?: PlanDetailProps; planId?: string }) => {
  const form = useForm<CreateFRSFormType>({
    resolver: zodResolver(createFRSFormSchema),
    defaultValues: {
      title: props.planDetail?.title ?? "",
      semester: props.planDetail ? props.planDetail.semester.toString() : "",
    },
  });
  const classContext = useClassContext();
  const sks = React.useMemo(() => {
    return classContext.classTaken.reduce(
      (acc, cur) => acc + cur.Matkul.sks,
      0,
    );
  }, [classContext]);

  const mutation = useToastMutate({
    success: props.planDetail
      ? "Berhasil memperbarui rencana FRS"
      : "Berhasil membuat rencana FRS",
    loading: props.planDetail
      ? "Memperbarui rencana FRS..."
      : "Membuat rencana FRS...",
  });

  const onSubmit: SubmitHandler<CreateFRSFormType> = (data) => {
    if (classContext.classTaken.length > 0) {
      const subjects = classContext.classTaken.map((val) => val.id);
      if (props.planDetail) {
        mutation.mutate(
          updatePlanAction({
            data: {
              title: data.title,
              semester: parseInt(data.semester),
              matkul: subjects,
            },
            planId: props.planId ?? "",
          }),
        );
      } else {
        mutation.mutate(
          createPlanAction({
            title: data.title,
            semester: parseInt(data.semester),
            matkul: subjects,
          }),
        );
      }
    } else {
      toast.error("Kamu belum mengambil kelas sama sekali");
    }
  };

  const handleDropTakenClass = (index: number) => {
    const classArr = [...classContext.classTaken];
    classArr.splice(index, 1);
    classContext.setClassTaken(classArr);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Plan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih Semester</FormLabel>
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

        <div>
          <Typography variant="h4" className="text-base font-semibold">
            Matkul yang diambil
          </Typography>
          {classContext.classTaken.length > 0 ? (
            <div className="space-y-2">
              {classContext.classTaken.map((item, index) => (
                <ClassCard
                  data={{
                    lecturers: item.Lecturer,
                    sks: item.Matkul.sks,
                    subjectCode: item.code,
                    subjectName: item.Matkul.name,
                    taken: item.taken,
                    day: item.day,
                    sessionTime: item.Session?.session_time,
                  }}
                  size="sm"
                  key={item.id}
                >
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDropTakenClass(index)}
                  >
                    Drop
                  </Button>
                </ClassCard>
              ))}
            </div>
          ) : (
            <Typography
              variant="label1"
              className="pt-2 text-sm font-normal text-muted-foreground"
            >
              Kamu belum mengambil matkul apapun
            </Typography>
          )}
        </div>

        <Typography variant="h4" className="text-base font-semibold">
          Total SKS : {sks}
        </Typography>
        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <>
              <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
              Tunggu...
            </>
          ) : (
            "Simpan"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FRSForm;
