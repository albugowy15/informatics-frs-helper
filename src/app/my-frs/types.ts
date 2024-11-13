import { RouterOutputs } from "@/trpc/routers/root";

export interface SearchParam {
  semester?: string;
  subject?: string;
}

export type FilteredClass = RouterOutputs["common"]["getClass"][0];

export interface FrsLayoutProps {
  planId?: string;
  planDetail?: PlanDetailProps;
  params: SearchParam;
}

export type PlanDetailProps = RouterOutputs["frs"]["getPlanDetail"];

export type PlanDetailClass = PlanDetailProps["Class"][0];
