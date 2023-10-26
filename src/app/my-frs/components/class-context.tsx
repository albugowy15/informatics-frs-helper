'use client';

import React, { createContext, useState } from 'react';

import { PlanDetailClass } from '@/app/my-frs/type';

export const ClassContext = createContext<{
  classTaken: PlanDetailClass[];
  setClassTaken: React.Dispatch<React.SetStateAction<PlanDetailClass[]>>;
} | null>(null);

const ClassContextProvider = ({
  children,
  planDetailClass,
}: {
  children: React.ReactNode;
  planDetailClass?: PlanDetailClass[];
}) => {
  const [classTaken, setClassTaken] = useState<PlanDetailClass[]>(
    planDetailClass ? planDetailClass : [],
  );
  return (
    <ClassContext.Provider value={{ classTaken, setClassTaken }}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
