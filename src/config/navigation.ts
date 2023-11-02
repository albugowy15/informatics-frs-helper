export type Navigation = {
  name: string;
  url: string;
};

export const homeNavigation: Navigation[] = [
  {
    name: "Jadwal Kelas",
    url: "/jadwal",
  },
  {
    name: "Trading Kelas",
    url: "/trading",
  },
  {
    name: "Kelas Trending",
    url: "/trending",
  },
  {
    name: "Panduan",
    url: "/panduan",
  },
  {
    name: "Report",
    url: "/report",
  },
];
