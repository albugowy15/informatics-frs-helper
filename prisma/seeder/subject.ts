import { type Matkul } from "@prisma/client";

const subjects: Omit<Matkul, "id">[] = [
  {
    name: "Dasar Pemrograman",
    semester: 1,
    sks: 4,
  },
  {
    name: "Sistem Digital",
    semester: 1,
    sks: 3,
  },
  {
    name: "Aljabar Linier",
    semester: 1,
    sks: 3,
  },
  {
    name: "Sistem Basis Data",
    semester: 1,
    sks: 4,
  },
  {
    name: "Struktur Data",
    semester: 2,
    sks: 4,
  },
  {
    name: "Sistem Operasi",
    semester: 2,
    sks: 4,
  },
  {
    name: "Organisasi Komputer",
    semester: 2,
    sks: 3,
  },
  {
    name: "Komputasi Numerik",
    semester: 2,
    sks: 3,
  },
  {
    name: "Pengenalan Teknologi Elektro dan Informatika Cerdas",
    semester: 2,
    sks: 2,
  },
  {
    name: "Pemrograman Web",
    semester: 3,
    sks: 3,
  },
  {
    name: "Pemrograman Berorientasi Obyek",
    semester: 3,
    sks: 3,
  },
  {
    name: "Jaringan Komputer",
    semester: 3,
    sks: 4,
  },
  {
    name: "Teori Graf",
    semester: 3,
    sks: 3,
  },
  {
    name: "Matematika Diskrit",
    semester: 3,
    sks: 3,
  },
  {
    name: "Konsep Kecerdasan Artifisial",
    semester: 3,
    sks: 3,
  },
  {
    name: "Konsep Pengembangan Perangkat Lunak",
    semester: 3,
    sks: 2,
  },
  {
    name: "Pemrograman Jaringan",
    semester: 4,
    sks: 3,
  },
  {
    name: "Probabilitas dan Statistik",
    semester: 4,
    sks: 3,
  },
  {
    name: "Otomata",
    semester: 4,
    sks: 2,
  },
  {
    name: "Manajemen Basis Data",
    semester: 4,
    sks: 3,
  },
  {
    name: "Perancangan dan Analisis Algoritma",
    semester: 4,
    sks: 3,
  },
  {
    name: "Pembelajaran Mesin",
    semester: 4,
    sks: 3,
  },
  {
    name: "Perancangan Perangkat Lunak",
    semester: 4,
    sks: 3,
  },
  {
    name: "Teknologi antar Jaringan",
    semester: 5,
    sks: 3,
  },
  {
    name: "Jaringan Nirkabel",
    semester: 5,
    sks: 3,
  },
  {
    name: "Pemodelan dan Simulasi",
    semester: 5,
    sks: 3,
  },
  {
    name: "Grafika Komputer",
    semester: 5,
    sks: 3,
  },
  {
    name: "Rekayasa Sistem Berbasis Pengetahuan",
    semester: 5,
    sks: 3,
  },
  {
    name: "Pemrograman Kompetitif",
    semester: 5,
    sks: 3,
  },
  {
    name: "Tata Kelola Teknologi Informasi",
    semester: 5,
    sks: 5,
  },
  {
    name: "Keamanan Informasi",
    semester: 5,
    sks: 3,
  },
  {
    name: "Manajemen Proyek Perangkat Lunak",
    semester: 5,
    sks: 3,
  },
  {
    name: "Rekayasa Kebutuhan",
    semester: 5,
    sks: 3,
  },
  {
    name: "Sistem Enterprise",
    semester: 5,
    sks: 3,
  },
  {
    name: "Sistem Terdistribusi",
    semester: 5,
    sks: 3,
  },
  {
    name: "Data Mining",
    semester: 5,
    sks: 3,
  },
  {
    name: "Teknik Pengembangan Game",
    semester: 5,
    sks: 3,
  },
  {
    name: "Pengolahan Citra dan Visi Komputer",
    semester: 5,
    sks: 3,
  },
  {
    name: "Riset Operasi",
    semester: 5,
    sks: 3,
  },
  {
    name: "Pemorgraman Berbasis Kerangka Kerja",
    semester: 5,
    sks: 3,
  },
  {
    name: "Sistem Informasi Geografis",
    semester: 6,
    sks: 3,
  },
  {
    name: "Teknik Peramalan",
    semester: 6,
    sks: 3,
  },
  {
    name: "Keamanan Jaringan",
    semester: 6,
    sks: 3,
  },
  {
    name: "Kerja Praktik",
    semester: 6,
    sks: 4,
  },
  {
    name: "Game Engine",
    semester: 6,
    sks: 3,
  },
  {
    name: "Desain Pengalaman Pengguna",
    semester: 6,
    sks: 3,
  },
  {
    name: "Komputasi Bergerak",
    semester: 6,
    sks: 3,
  },
  {
    name: "Game Edukasi dan Simulasi",
    semester: 6,
    sks: 3,
  },
  {
    name: "Pemrograman Berbasis Antarmuka",
    semester: 6,
    sks: 3,
  },
  {
    name: "Text Mining",
    semester: 6,
    sks: 3,
  },
  {
    name: "Simulasi Berbasis Agen",
    semester: 6,
    sks: 3,
  },
  {
    name: "Basis Data Terdistribusi",
    semester: 6,
    sks: 3,
  },
  {
    name: "Simulasi Sistem Dinamis",
    semester: 6,
    sks: 3,
  },
  {
    name: "Evolusi Perangkat Lunak",
    semester: 6,
    sks: 3,
  },
  {
    name: "Konstruksi Perangkat Lunak",
    semester: 6,
    sks: 3,
  },
  {
    name: "Keamanan Aplikasi",
    semester: 6,
    sks: 3,
  },
  {
    name: "Animasi Komputer dan Pemodelan 3D",
    semester: 6,
    sks: 3,
  },
  {
    name: "Pemrograman Perangkat Bergerak",
    semester: 6,
    sks: 3,
  },
  {
    name: "Komputasi Pervasif dan Jaringan Sensor",
    semester: 6,
    sks: 3,
  },
  {
    name: "Deep Learning",
    semester: 6,
    sks: 3,
  },
  {
    name: "Audit Sistem",
    semester: 6,
    sks: 3,
  },
  {
    name: "Interaksi Manusia dan Komputer",
    semester: 6,
    sks: 3,
  },
  {
    name: "Kualitas Perangkat Lunak",
    semester: 6,
    sks: 3,
  },
  {
    name: "Realitas X",
    semester: 7,
    sks: 3,
  },
  {
    name: "Analisis Data Multivariat",
    semester: 7,
    sks: 3,
  },
  {
    name: "Big Data",
    semester: 7,
    sks: 3,
  },
  {
    name: "Etika Profesi",
    semester: 7,
    sks: 2,
  },
  {
    name: "Pemrograman Pengolahan Sinyal",
    semester: 7,
    sks: 3,
  },
  {
    name: "Robotika",
    semester: 7,
    sks: 3,
  },
  {
    name: "Game Cerdas",
    semester: 7,
    sks: 3,
  },
  {
    name: "Pemrograman Data Sains Terapan",
    semester: 7,
    sks: 3,
  },
  {
    name: "Teknologi IoT",
    semester: 7,
    sks: 3,
  },
  {
    name: "Forensik Digital",
    semester: 7,
    sks: 3,
  },
  {
    name: "Komputasi Awan",
    semester: 7,
    sks: 3,
  },
  {
    name: "Simulasi Berorientasi Obyek",
    semester: 7,
    sks: 3,
  },
  {
    name: "Komputasi Kuantum",
    semester: 7,
    sks: 3,
  },
  {
    name: "Arsitektur Perangkat Lunak",
    semester: 7,
    sks: 3,
  },
  {
    name: "Magang",
    semester: 7,
    sks: 6,
  },
  {
    name: "Proposal Tugas Akhir",
    semester: 7,
    sks: 2,
  },
  {
    name: "Tugas Akhir",
    semester: 8,
    sks: 5,
  },
];

export { subjects };
