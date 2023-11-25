"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
import ChooseClassSection from "@/app/my-trade-matkul/_components/choose-class-section";
import { type TradeMatkul } from "@/app/my-trade-matkul/types";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

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

const TradeMatkulForm = ({ prevData }: TradeMatkulFormProps) => {
  const router = useRouter();
  const form = useForm<CreateTradeMatkulFormSchema>({
    resolver: zodResolver(createTradeMatkulFormSchema),
    defaultValues: {
      hasClass: prevData?.hasMatkul.id,
      description: prevData?.description,
      hasMatkul: prevData?.hasMatkul.Matkul.id,
      hasMatkulSemester: prevData?.hasMatkul.Matkul.semester.toString(),
      searchClass: prevData?.searchMatkul.id,
      searchMatkul: prevData?.searchMatkul.Matkul.id,
      searchMatkulSemester: prevData?.searchMatkul.Matkul.semester.toString(),
    },
  });
  const { toast } = useToast();

  const mutateCreateTradeMatkul = api.tradeMatkul.createTradeMatkul.useMutation(
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasil membuat post trade matkul",
        });
        window.location.replace("/my-trade-matkul");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    },
  );
  const mutateUpdateTradeMatkul = api.tradeMatkul.updateTradeMatkul.useMutation(
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasil membuat post trade matkul",
        });
        window.location.replace("/my-trade-matkul/");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    },
  );

  const onSubmit: SubmitHandler<CreateTradeMatkulFormSchema> = (data) => {
    if (prevData) {
      mutateUpdateTradeMatkul.mutate({
        description: data.description,
        hasClassId: data.hasClass,
        searchClassId: data.searchClass,
        tradeMatkulId: prevData.id,
      });
    } else {
      mutateCreateTradeMatkul.mutate({
        description: data.description,
        hasClassId: data.hasClass,
        searchClassId: data.searchClass,
      });
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 md:flex-row md:justify-between">
          <ChooseClassSection variant="has" />
          <ChooseClassSection variant="want" />
        </div>

        <div className="py-2" />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Plisss... yang mau nuker dapat pahala"
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
          <Button
            type="submit"
            disabled={
              mutateCreateTradeMatkul.isLoading ||
              mutateUpdateTradeMatkul.isLoading
            }
          >
            {mutateCreateTradeMatkul.isLoading ||
            mutateUpdateTradeMatkul.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait..
              </>
            ) : (
              "Simpan"
            )}
          </Button>
          <Button
            variant="outline"
            disabled={
              mutateCreateTradeMatkul.isLoading ||
              mutateUpdateTradeMatkul.isLoading
            }
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
