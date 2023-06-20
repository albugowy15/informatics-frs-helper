import { NextSeo } from 'next-seo';

import { renderPageTitle } from '@/utils/page';

import Typography from '@/components/Typography';

export default function PanduanPage() {
  return (
    <>
      <NextSeo
        title={renderPageTitle('Panduan Penggunaan')}
        description='Panduan penggunaan aplikasi Informatics FRS Helper'
      />
      <main className='space-y-2'>
        <Typography variant='h2'>
          Panduan Penggunaan Informatics FRS Helper
        </Typography>
        <Typography variant='body1'>
          Website ini diperuntukkan untuk membantu mahasiswa Informatika ITS
          dalam melakukan FRS. Berikut 3 hal yang bisa kamu lakukan di website
          ini:
        </Typography>
        <ol className='list-inside list-decimal'>
          <li>
            <b>myFRS</b> - Plan atau Rencana FRS
          </li>
          <li>
            <b>myTradeMatkul</b> - Trading Matkul
          </li>
          <li>Informasi Jadwal Matkul</li>
        </ol>
        <div className='py-1' />
        <Typography variant='h3'>1. myFRS - Plan atau Rencana FRS</Typography>
        <Typography variant='body1'>
          Kamu bisa membuat dan merancang rencana kelas dan mata kuliah apa saja
          yang akan kamu ambil saat FRS. Kamu bisa membuat hingga 3 rencana.
          Setiap kali kamu mengambil matkul akan dilakukan validasi meliputi :
        </Typography>
        <ul className='list-inside list-disc'>
          <li>Tidak boleh mengambil kelas yang sama</li>
          <li>
            Tidak boleh mengambil lebih dari satu kelas pada hari dan jam
            perkuliahan yang sama
          </li>
          <li>Tidak dapat mengambil kelas dengan mata kuliah yang sama</li>
          <li>Tidak dapat mengambil lebih dari 24 sks</li>
        </ul>
        <Typography variant='body1'>
          Dengan ini, rencana FRS yang kamu buat akan tervalidasi dan tidak akan
          mengambil kelas yang tidak sesuai dengan aturan di atas. Ini juga akan
          membantu kamu dalam merencanakan FRS dengan lebih matang. Berikut
          untuk detail cara membuat rencana FRS:
        </Typography>
        <ol className='list-inside list-decimal'>
          <li>
            Buka menu <b>myFRS</b>
          </li>
          <li>
            Pilih <b>Buat Rencana Baru</b>
          </li>
          <li>Isi judul rencana</li>
          <li>Pilih semester dimana akan melakukan FRS</li>
          <li>
            Ambil kelas dan mata kuliah di bagian Form Ambil Matkul. Cari kelas
            dan matkul dengan memilih dropdown semester atau matkul
          </li>
          <li>
            Apabila sudah yakin dengan rencana yang dibuat, klik tombol{' '}
            <b>Simpan</b>.
          </li>
        </ol>
        <Typography variant='body1'>
          Kamu juga bisa mengubah atau menghapus rencana FRS yang sudah dibuat.
        </Typography>
        <div className='py-1' />
        <Typography variant='h3'>2. myTradeMatkul - Trading Matkul</Typography>
        <Typography variant='body1'>
          Kalau ini kamu bisa gunakan buat nyari orang yang mau tukeran matkul.
          Kamu bisa lihat daftar postingan trade matkul di menu{' '}
          <b>Trading Matkul</b>. Untuk membuat postingan trade matkul, ikuti
          langkah-langkah berikut:
        </Typography>
        <ol className='list-inside list-decimal'>
          <li>
            Buka menut <b>myTradeMatkul</b>
          </li>
          <li>
            Pilih semester, nama mata kuliah, dan kode kelas dari kelas yang
            udah diambil saat FRS
          </li>
          <li>
            Kemudian pilih semester, nama mata kuliah, dan kode kelas untuk
            kelas yang ingin kamu cari
          </li>
          <li>Tulis dan lengkapi deskripsinya</li>
          <li>Klik simpan</li>
        </ol>
        <Typography variant='body1'>
          Sangat dianjurkan agar melengkapi profil dengan mengisi nama lengkap,
          id line, atau WA untuk memudahkan orang yang mau trade sama kamu. Kamu
          juga bisa mengubah atau menghapus postingan trade matkul yang sudah
          dibuat.
        </Typography>
        <div className='py-1' />
        <Typography variant='h3'>3. Informasi Jadwal</Typography>
        <Typography variant='body1'>
          Kamu juga bisa sekedar melihat jadwal setiap matkul dan kelas. Buka
          aja menu <b>Jadwal Matkul</b>. Kamu bisa lihat jadwal matkul
          menggunakan filter berdasarkan semester dan nama mata kuliah.
        </Typography>
      </main>
    </>
  );
}
