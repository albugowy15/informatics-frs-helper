export type SearchParam = {
  semester: string;
  subject: string;
};

export type FilteredClass = {
  name: string;
  semester: number;
  Class: {
    code: string;
    Session: {
      session_time: string;
    } | null;
    Lecturer: {
      code: string;
      id: string;
      fullname: string;
    }[];
    id: string;
    day: string | null;
    taken: number;
  }[];
  id: string;
  sks: number;
};

export type FrsUiProps = {
  planId?: string;
  planDetail?: PlanDetailProps;
  classes: FilteredClass[];
};

export type PlanDetailClass = {
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

export type PlanDetailProps = {
  title: string;
  semester: number;
  userId: string | null;
  Class: PlanDetailClass[];
  id: string;
  totalSks: number;
};
