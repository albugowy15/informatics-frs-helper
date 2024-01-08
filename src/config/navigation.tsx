import {
  FileTextIcon,
  LockClosedIcon,
  PersonIcon,
  ShuffleIcon,
} from "@radix-ui/react-icons";

export interface Navigation {
  name: string;
  url: string;
}

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
  {
    name: "API",
    url: "/public-api",
  },
  {
    name: "Statistik",
    url: "/statistik",
  },
];

type MenuNavigation = {
  id: string;
  icon: React.ReactNode;
  afterSeparator?: boolean;
} & Navigation;

export const menuNavigation: MenuNavigation[] = [
  {
    id: crypto.randomUUID(),
    name: "Profil",
    url: "/profil",
    icon: <PersonIcon className="mr-2 h-4 w-4" />,
  },
  {
    id: crypto.randomUUID(),
    name: "Ubah Password",
    url: "/ubah-password",
    icon: <LockClosedIcon className="mr-2 h-4 w-4" />,
    afterSeparator: true,
  },
  {
    id: crypto.randomUUID(),
    name: "MyFRS",
    url: "/my-frs",
    icon: <FileTextIcon className="mr-2 h-4 w-4" />,
  },
  {
    id: crypto.randomUUID(),
    name: "MyTradeMatkul",
    url: "/my-trade-matkul",
    icon: <ShuffleIcon className="mr-2 h-4 w-4" />,
    afterSeparator: true,
  },
];
