"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/components/ui/use-toast";

import { ClassContext } from "@/app/my-frs/_components/class-context";
import { type PlanDetailProps } from "@/app/my-frs/types";
import { Semester } from "@/config/contants";
import { api } from "@/trpc/react";

const createFRSFormSchema = z.object({
  title: z
    .string({
      required_error: "Judul rencana FRS tidak boleh kosong",
    })
    .min(1, { message: "Judul rencana FRS tidak boleh kosong" })
    .max(20, { message: "Judul rencana FRS maksimal 20 karakter" }),
  semester: z
    .string({ required_error: "Semester tidak boleh kosong" })
    .min(1, { message: "Silahkan pilih semester" }),
});

type CreateFRSFormType = z.infer<typeof createFRSFormSchema>;

const CreateFRSForm = ({
  planDetail,
  planId,
}: {
  planDetail?: PlanDetailProps;
  planId?: string;
}) => {
  const form = useForm<CreateFRSFormType>({
    resolver: zodResolver(createFRSFormSchema),
    defaultValues: {
      title: planDetail?.title ?? "",
      semester: planDetail ? planDetail.semester.toString() : "",
    },
  });
  const context = useContext(ClassContext);
  const [sks, setSks] = useState(0);
  useEffect(() => {
    if (context) {
      setSks(context.classTaken.reduce((acc, cur) => acc + cur.Matkul.sks, 0));
    }
  }, [context, context?.classTaken]);

  const mutateUpdatePlan = api.frs.updatePlan.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Berhasil memperbarui rencana FRS",
      });
      window.location.replace("/my-frs");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
  const mutateCreatePlan = api.frs.createPlan.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Berhasil membuat rencana FRS",
      });
      window.location.replace("/my-frs");
    },
  });

  const onSubmit: SubmitHandler<CreateFRSFormType> = (data) => {
    if (context && context.classTaken.length > 0) {
      const subjects = context.classTaken.map((val) => val.id);
      if (planDetail) {
        mutateUpdatePlan.mutate({
          data: {
            title: data.title,
            semester: parseInt(data.semester),
            matkul: subjects,
          },
          planId: planId ?? "",
        });
      } else {
        mutateCreatePlan.mutate({
          title: data.title,
          semester: parseInt(data.semester),
          matkul: subjects,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Kamu belum mengambil kelas sama sekali",
      });
    }
  };

  const handleDropTakenClass = (index: number) => {
    const classArr = context ? [...context.classTaken] : [];
    classArr.splice(index, 1);
    context?.setClassTaken(classArr);
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
              <Input {...field} />
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
                  {Semester.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Typography variant="h4">Matkul yang diambil</Typography>
          {context && context.classTaken.length > 0 ? (
            <>
              <div className="space-y-2">
                {context.classTaken.map((item, index) => (
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
            </>
          ) : (
            <Typography variant="label1" className="pt-2 font-normal">
              Kamu belum mengambil matkul apapun
            </Typography>
          )}
        </div>

        <Typography variant="h4">Total SKS : {sks}</Typography>
        <Button
          type="submit"
          disabled={mutateCreatePlan.isLoading || mutateUpdatePlan.isLoading}
        >
          {mutateCreatePlan.isLoading || mutateUpdatePlan.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </>
          ) : (
            <>Simpan</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateFRSForm;
