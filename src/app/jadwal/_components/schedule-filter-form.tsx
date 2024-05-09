"use client";

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
import React from "react";
import { useScheduleFilterForm } from "./use-schedule-filter-form";

interface ScheduleFilterFormProps {
  children: React.ReactNode;
}

const ScheduleFilterForm = (props: ScheduleFilterFormProps) => {
  const { form, onSubmit, listSubjects } = useScheduleFilterForm();

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
        {props.children}
      </form>
    </Form>
  );
};

const ScheduleFilterFormAction = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};

export { ScheduleFilterForm, ScheduleFilterFormAction };
