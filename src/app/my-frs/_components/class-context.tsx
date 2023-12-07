"use client";

import React, { createContext, useState } from "react";
import { type PlanDetailClass } from "@/app/my-frs/types";

export const ClassContext = createContext<{
  classTaken: PlanDetailClass[];
  setClassTaken: React.Dispatch<React.SetStateAction<PlanDetailClass[]>>;
} | null>(null);

interface ClassContextProvider {
  children: React.ReactNode;
  planDetailClass?: PlanDetailClass[];
}

const ClassContextProvider = (props: ClassContextProvider) => {
  const [classTaken, setClassTaken] = useState<PlanDetailClass[]>(
    props.planDetailClass ? props.planDetailClass : [],
  );
  return (
    <ClassContext.Provider value={{ classTaken, setClassTaken }}>
      {props.children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
