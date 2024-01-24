"use client";

import { useFormContext, useWatch } from "react-hook-form";
import Typography from "@/components/typography";
import {
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
import { type CreateTradeMatkulFormSchema } from "@/app/my-trade-matkul/_components/trade-matkul-form";
import { SemesterWithKey } from "@/config/contants";
import { api } from "@/trpc/react";

interface ChooseClassSectionProps {
  variant: "has" | "want";
}

const ChooseClassSection = (props: ChooseClassSectionProps) => {
  const formCtx = useFormContext<CreateTradeMatkulFormSchema>();
  const semesterField =
    props.variant == "has" ? "hasMatkulSemester" : "searchMatkulSemester";
  const subjectField = props.variant == "has" ? "hasMatkul" : "searchMatkul";
  const classField = props.variant == "has" ? "hasClass" : "searchClass";
  const sectionTitle =
    props.variant == "has" ? "Dimiliki (Have)" : "Diinginkan (Want)";

  const semesterWatch = useWatch({
    control: formCtx.control,
    name: semesterField,
  });
  const subjectWatch = useWatch({
    control: formCtx.control,
    name: subjectField,
  });
  const listSubject = api.common.getSubject.useQuery({
    semester: parseInt(semesterWatch),
  });
  const listClass = api.common.getClassBySubject.useQuery({
    subjectId: subjectWatch,
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <Typography variant="h4">Kelas yang {sectionTitle}</Typography>
      <FormField
        control={formCtx.control}
        name={semesterField}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilih semester</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih semester"></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SemesterWithKey.map((semester) => (
                  <SelectItem value={semester.value} key={semester.id}>
                    {semester.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formCtx.control}
        name={subjectField}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilih matkul</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih matkul"></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {listSubject.data && listSubject.data.length > 0 ? (
                  listSubject.data.map((subject) => (
                    <SelectItem value={subject.id} key={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-class">
                    --Tidak ada matkul--
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formCtx.control}
        name={classField}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilih kelas</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas"></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {listClass.data && listClass.data.length > 0 ? (
                  listClass.data.map((kelas) => (
                    <SelectItem value={kelas.id} key={kelas.id}>
                      {kelas.code}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-class">
                    --Tidak ada kelas--
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChooseClassSection;
