'use client';

import React, { createContext, useState } from 'react';

export const ClassContext = createContext<{
  classTaken: TakenClassType[] | null;
  setClassTaken: React.Dispatch<React.SetStateAction<TakenClassType[] | null>>;
} | null>(null);

export type TakenClassType = {
  id: string;
  code: string;
  taken: number;
  Matkul: {
    semester: number;
    name: string;
    sks: number;
    id: string;
  };
  Session?: {
    session_time: string;
  } | null;
  Lecturer: {
    id: string;
    fullname: string;
  }[];
  day?: string | null;
};

const ClassContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [classTaken, setClassTaken] = useState<TakenClassType[] | null>(null);
  return (
    <ClassContext.Provider value={{ classTaken, setClassTaken }}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
