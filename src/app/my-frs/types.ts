import { type RouterOutputs } from "@/trpc/shared";

export type SearchParam = {
  semester: string;
  subject: string;
};

export type FilteredClass = RouterOutputs["common"]["getClass"][0];

export type FrsUiProps = {
  planId?: string;
  planDetail?: PlanDetailProps;
  classes: FilteredClass[];
};

export type PlanDetailProps = RouterOutputs["frs"]["getPlanDetail"];

export type PlanDetailClass = PlanDetailProps["Class"][0];
