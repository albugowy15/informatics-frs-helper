"use client";

import ChooseClassSection from "@/app/my-trade-matkul/_components/choose-class-section";
import { type TradeMatkul } from "@/app/my-trade-matkul/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToastMutate } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { createTradeMatkulAction, updateTradeMatkulAction } from "../actions";

const createTradeMatkulFormSchema = z.object({
  hasMatkul: z
    .string({
      required_error: "Pilih matkul yang kamu miliki",
    })
    .min(1, { message: "Pilih matkul yang kamu miliki" }),
  hasClass: z
    .string({ required_error: "Pilih kelas yang kamu miliki" })
    .min(1, {
      message: "Pilih kelas yang kamu miliki",
    }),
  hasMatkulSemester: z
    .string({
      required_error: "Pilih semester dari kelas yang kamu miliki",
    })
    .min(1, { message: "Pilih semester dari kelas yang kamu miliki" }),
  searchMatkul: z
    .string({
      required_error: "Pilih matkul yang kamu cari",
    })
    .min(1, { message: "Pilih matkul yang kamu cari" }),
  searchClass: z
    .string({ required_error: "Pilih kelas yang kamu cari" })
    .min(1, {
      message: "Pilih kelas yang kamu cari",
    }),
  searchMatkulSemester: z
    .string({
      required_error: "Pilih semester dari kelas yang kamu cari",
    })
    .min(1, { message: "Pilih semester dari kelas yang kamu cari" }),
  description: z
    .string({ required_error: "Deskripsi tidak boleh kosong" })
    .max(150, { message: "Deskripsi tidak boleh lebih dari 150 karakter" })
    .min(1, { message: "Deskripsi tidak boleh kosong" }),
});

export type CreateTradeMatkulFormSchema = z.infer<
  typeof createTradeMatkulFormSchema
>;

interface TradeMatkulFormProps {
  prevData?: TradeMatkul;
}

const TradeMatkulForm = (props: TradeMatkulFormProps) => {
  const router = useRouter();
  const form = useForm<CreateTradeMatkulFormSchema>({
    resolver: zodResolver(createTradeMatkulFormSchema),
    defaultValues: {
      hasClass: props.prevData?.hasMatkul.id,
      description: props.prevData?.description,
      hasMatkul: props.prevData?.hasMatkul.Matkul.id,
      hasMatkulSemester: props.prevData?.hasMatkul.Matkul.semester.toString(),
      searchClass: props.prevData?.searchMatkul.id,
      searchMatkul: props.prevData?.searchMatkul.Matkul.id,
      searchMatkulSemester:
        props.prevData?.searchMatkul.Matkul.semester.toString(),
    },
  });
  const mutation = useToastMutate({
    success: props.prevData
      ? "Berhasil memperbarui post trade matkul"
      : "Berhasil membuat post trade matkul",
    loading: props.prevData
      ? "Memperbarui post trade matkul..."
      : "Membuat post trade matkul...",
  });

  const onSubmit: SubmitHandler<CreateTradeMatkulFormSchema> = (data) => {
    if (props.prevData) {
      mutation.mutate(
        updateTradeMatkulAction({
          description: data.description,
          hasClassId: data.hasClass,
          searchClassId: data.searchClass,
          tradeMatkulId: props.prevData.id,
        }),
      );
    } else {
      mutation.mutate(
        createTradeMatkulAction({
          description: data.description,
          hasClassId: data.hasClass,
          searchClassId: data.searchClass,
        }),
      );
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <ChooseClassSection variant="has" />
          <ChooseClassSection variant="want" />
        </div>

        <div className="py-2" />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="max-w-2xl">
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Plisss... yang mau nuker dapat pahala"
                  rows={5}
                  {...field}
                ></Textarea>
              </FormControl>
              <FormDescription>
                Tulis deskripsi semenarik mungkin. Maksimal 150 karakter
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-4" />
        <div className="flex items-center gap-4">
          <Button type="submit" loading={mutation.isLoading}>
            Simpan
          </Button>
          <Button
            variant="outline"
            disabled={mutation.isLoading}
            onClick={() => router.back()}
          >
            Batal
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TradeMatkulForm;
