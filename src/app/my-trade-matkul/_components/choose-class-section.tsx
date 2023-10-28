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
import { Semester } from "@/config/contants";
import { api } from "@/trpc/react";

type ChooseClassSectionProps = {
  variant: "has" | "want";
};

const ChooseClassSection = ({ variant }: ChooseClassSectionProps) => {
  const formCtx = useFormContext<CreateTradeMatkulFormSchema>();
  const semesterField =
    variant == "has" ? "hasMatkulSemester" : "searchMatkulSemester";
  const subjectField = variant == "has" ? "hasMatkul" : "searchMatkul";
  const classField = variant == "has" ? "hasClass" : "searchClass";

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
      <Typography variant="h4">
        Kelas yang ${variant == "has" ? "Dimiliki" : "Diinginkan"}
      </Typography>
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
                {Semester.map((semester, index) => (
                  <SelectItem value={semester} key={index}>
                    {semester}
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
              <SelectContent className="max-h-52 overflow-y-auto">
                {listSubject.data && listSubject.data.length > 0 ? (
                  <>
                    {listSubject.data.map((subject) => (
                      <SelectItem value={subject.id} key={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </>
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
              <SelectContent className="max-h-52 overflow-y-auto">
                {listClass.data && listClass.data.length > 0 ? (
                  <>
                    {listClass.data.map((kelas) => (
                      <SelectItem value={kelas.id} key={kelas.id}>
                        {kelas.code}
                      </SelectItem>
                    ))}
                  </>
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
