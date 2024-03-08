"use client";

import { type PlanDetailClass } from "@/app/my-frs/types";
import React from "react";

interface ClassContext {
  classTaken: PlanDetailClass[];
  setClassTaken: React.Dispatch<React.SetStateAction<PlanDetailClass[]>>;
}

const ClassContext = React.createContext<ClassContext | undefined>(undefined);

interface ClassContextProvider {
  children: React.ReactNode;
  planDetailClass?: PlanDetailClass[];
}

const ClassContextProvider = (props: ClassContextProvider) => {
  const [classTaken, setClassTaken] = React.useState<PlanDetailClass[]>(
    props.planDetailClass ?? [],
  );
  return (
    <ClassContext.Provider value={{ classTaken, setClassTaken }}>
      {props.children}
    </ClassContext.Provider>
  );
};

export function useClassContext() {
  const context = React.useContext(ClassContext);
  if (!context) throw new Error("No class context available");
  return context;
}

export default ClassContextProvider;
