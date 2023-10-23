import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import Typography from '@/components/typography';

export const metadata: Metadata = {
  title: renderPageTitle('Panduan Penggunaan'),
  description: 'Panduan penggunaan aplikasi Informatics FRS Helper',
};

export default function PanduanPage() {
  return (
    <>
      <main className='space-y-2'>
        <Typography variant='h2'>
          Panduan Penggunaan Informatics FRS Helper
        </Typography>
        <Typography variant='body1'>
          Website ini diperuntukkan untuk membantu mahasiswa Informatika ITS
          dalam melakukan FRS yang terdiri dari 3 fitur sebagai berikut.
        </Typography>
        <Typography variant='h3'>1. myFRS - Plan atau Rencana FRS</Typography>
        <Typography variant='body1'>
          Rencanakan kelas dan mata kuliah apa saja yang akan diambil saat FRS.
          Kuota maksimal plan yang dapat dibuat adalah 3 untuk setiap akun.
          Setiap kali dilakukan pengambilan kelas, akan dilakukan validasi
          meliputi :
        </Typography>
        <ul className='list-inside list-disc'>
          <li>Tidak dapat mengambil kelas yang sama</li>
          <li>
            Tidak dapat mengambil lebih dari satu kelas pada hari dan jam
            perkuliahan yang sama
          </li>
          <li>Tidak dapat mengambil kelas dengan mata kuliah yang sama</li>
          <li>Tidak dapat mengambil lebih dari 24 sks</li>
        </ul>
        <Typography variant='body1'>
          Dengan ini, rencana FRS yang dibuat akan valid sehingga membantu
          perencanaan FRS yang lebih matang. Berikut cara membuat rencana FRS
          (myFRs):
        </Typography>
        <ol className='list-inside list-decimal'>
          <li>
            Buka menu <b>myFRS</b> yang ada di ikon Profil
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
        <div className='py-1' />
        <Typography variant='h3'>2. myTradeMatkul - Trading Matkul</Typography>
        <Typography variant='body1'>
          Digunakan untuk mencari patner tukar matkul. Silahkan lihat daftar
          postingan trade matkul di menu <b>Trading Matkul</b>. Untuk membuat
          postingan trade matkul, ikuti langkah-langkah berikut:
        </Typography>
        <ol className='list-inside list-decimal'>
          <li>
            Buka menut <b>myTradeMatkul</b> yang ada di ikon Profil
          </li>
          <li>
            Pilih semester, nama mata kuliah, dan kode kelas yang telah diambil
            saat FRS
          </li>
          <li>
            Kemudian pilih semester, nama mata kuliah, dan kode kelas untuk
            kelas yang ingin dicari
          </li>
          <li>Tulis dan lengkapi deskripsinya</li>
          <li>Klik simpan</li>
        </ol>
        <Typography variant='body1'>
          Sangat dianjurkan agar melengkapi profil terlebih dulu dengan mengisi
          nama lengkap, id line, atau WA untuk memudahkan patner yang ingin
          trade dengan kamu. Kamu juga dapat mengubah atau menghapus postingan
          trade matkul yang telah dibuat.
        </Typography>
        <div className='py-1' />
        <Typography variant='h3'>3. Informasi Jadwal</Typography>
        <Typography variant='body1'>
          Lihat jadwal setiap matkul dan kelas di menu <b>Jadwal Matkul</b>.
          Filter jadwal berdasarkan semester dan mata kuliah.
        </Typography>
        <div className='py-1' />
        <Typography variant='h2'>Batasan Fitur yang dimiliki</Typography>
        <Typography variant='body1'>
          Terdapat beberapa batasan terkait informasi atau fitur yang ada
          sebagai berikut:{' '}
        </Typography>
        <Typography variant='h4'>
          Tidak menyertakan mata kuliah UPMB dan Pengayaan
        </Typography>
        <Typography variant='body1'>
          Mata kuliah UPMB dan pengayaan tidak disertakan. Hal ini karena mata
          kuliah UPMB dan pengayaan memiliki jadwal sendiri yang terpisah dari
          plotting jadwal kelas departemen.
        </Typography>
        <Typography variant='h4'>Maksimal 3 Plan FRS</Typography>
        <Typography variant='body1'>
          Dalam satu semester, satu akun hanya diperbolehkan untuk membuat
          hingga 3 rencana FRS.
        </Typography>
        <Typography variant='h4'>
          FRS dihapus setiap pergantian semester
        </Typography>
        <Typography variant='body1'>
          Saat akan pergantian semester, frs yang telah tersimpan pada semester
          sebelumnya akan dihapus.
        </Typography>
      </main>
    </>
  );
}
