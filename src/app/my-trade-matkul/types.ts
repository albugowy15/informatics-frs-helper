export type TradeMatkul = {
  id: string;
  searchMatkul: {
    code: string;
    Matkul: {
      semester: number;
      id: string;
      name: string;
    };
    id: string;
  };
  hasMatkul: {
    code: string;
    Matkul: {
      semester: number;
      id: string;
      name: string;
    };
    id: string;
  };
  description: string;
  userId: string;
};
