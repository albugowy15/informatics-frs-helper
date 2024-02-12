import { type Metadata } from "next";

import Typography from "@/components/typography";

import { renderPageTitle } from "@/lib/utils";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: renderPageTitle("Panduan Penggunaan"),
  description: "Panduan penggunaan aplikasi Informatics FRS Helper",
};

export default function PanduanPage() {
  return (
    <main className="space-y-2">
      <Typography variant="h2">
        Panduan Penggunaan Informatics FRS Helper
      </Typography>
      <Typography variant="body1">
        Selamat datang di website yang dirancang khusus untuk membantu mahasiswa
        Informatika ITS dalam menyusun Rencana FRS (Formulir Rencana Studi).
        Terdapat tiga fitur utama yang dapat membantu kamu dalam proses
        tersebut.
      </Typography>
      <Typography variant="h3">1. myFRS - Plan atau Rencana FRS</Typography>
      <Typography variant="body1">
        Dengan fitur myFRS, kamu dapat merencanakan kelas dan mata kuliah yang
        akan diambil pada setiap FRS. Setiap akun diperbolehkan membuat maksimal
        3 rencana FRS. Validasi dilakukan untuk memastikan:
      </Typography>
      <ul className="list-inside list-disc">
        <li>Tidak ada pengambilan kelas yang sama.</li>
        <li>
          Tidak lebih dari satu kelas diambil pada hari dan jam perkuliahan yang
          sama.
        </li>
        <li>Tidak ada pengambilan kelas dengan mata kuliah yang identik.</li>
        <li>Batas maksimum SKS yang dapat diambil adalah 24.</li>
      </ul>
      <Typography variant="body1">
        Berikut langkah-langkah membuat rencana FRS (myFRS):
      </Typography>
      <ol className="list-inside list-decimal">
        <li>
          Buka menu{" "}
          <Link
            href="/my-frs"
            className="underline transition-colors hover:text-primary"
          >
            <b>myFRS</b>
          </Link>{" "}
          pada ikon Dashboard{" "}
          <Button variant="outline" size="icon" className="">
            <DashboardIcon className="h-5 w-5" />
          </Button>
        </li>
        <li>
          Pilih <b>Buat Rencana Baru.</b>
        </li>
        <li>Isi judul rencana dan pilih semester FRS.</li>
        <li>
          Ambil kelas dan mata kuliah melalui Form Ambil Matkul dengan
          menggunakan dropdown semester atau mata kuliah.
        </li>
        <li>
          Setelah yakin dengan rencana, klik tombol <b>Simpan</b>.
        </li>
      </ol>
      <div className="py-1" />
      <Typography variant="h3">2. myTradeMatkul - Trading Matkul</Typography>
      <Typography variant="body1">
        myTradeMatkul berguna untuk mencari partner tukar matkul. Lihat daftar
        postingan trade matkul di menu{" "}
        <Link
          href="/trading"
          className="underline transition-colors hover:text-primary"
        >
          <b>Trading Kelas</b>
        </Link>
        . Untuk membuat postingan, ikuti langkah-langkah berikut:
      </Typography>
      <ol className="list-inside list-decimal">
        <li>
          Buka menu{" "}
          <Link
            href="/my-trade-matkul"
            className="underline transition-colors hover:text-primary"
          >
            <b>myTradeMatkul</b>
          </Link>{" "}
          pada ikon Dashboard{" "}
          <Button variant="outline" size="icon" className="">
            <DashboardIcon className="h-5 w-5" />
          </Button>
        </li>
        <li>
          Pilih semester, nama mata kuliah, dan kode kelas yang telah diambil
          saat FRS
        </li>
        <li>
          Kemudian pilih semester, nama mata kuliah, dan kode kelas untuk kelas
          yang ingin dicari
        </li>
        <li>Lengkapilah deskripsi dan klik Simpan.</li>
      </ol>
      <Typography variant="body1">
        Pastikan untuk melengkapi profil dengan informasi seperti nama lengkap,
        ID Line, atau WhatsApp untuk memudahkan partner yang ingin melakukan
        trade. Kamu juga dapat mengubah atau menghapus postingan trade matkul
        yang telah dibuat.
      </Typography>
      <div className="py-1" />
      <Typography variant="h3">3. Informasi Jadwal</Typography>
      <Typography variant="body1">
        Cek jadwal setiap mata kuliah dan kelas melalui menu{" "}
        <Link
          href="/jadwal"
          className="underline transition-colors hover:text-primary"
        >
          <b>Jadwal Kelas</b>
        </Link>
        . Filter jadwal berdasarkan semester dan mata kuliah.
      </Typography>
      <div className="py-1" />
      <Typography variant="h2">Batasan Fitur</Typography>
      <Typography variant="body1">
        Beberapa batasan penting yang perlu diperhatikan:
      </Typography>
      <ol className="list-inside list-disc">
        <li>
          Tidak termasuk mata kuliah UPMB dan Pengayaan, karena memiliki jadwal
          terpisah.
        </li>
        <li>Maksimal 3 rencana FRS per semester.</li>
        <li>FRS akan dihapus setiap pergantian semester.</li>
      </ol>
    </main>
  );
}
