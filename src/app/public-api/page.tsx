import { type Metadata } from "next";

import Typography from "@/components/typography";

import { renderPageTitle } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: renderPageTitle("API"),
  description: "Public API Informatics FRS Helper",
};

export default function PanduanPage() {
  return (
    <main className="space-y-2">
      <Typography variant="h2">Public API Informatics FRS Helper</Typography>
      <Typography variant="body1">
        Ini adalah API Public yang dapa digunakan untuk mendapatkan informasi
        tambahan terkait FRS yang mungkin tidak ditemukan di website ini.
        Informasi yang bisa didapatkan terkait{" "}
        <strong>daftar kelas, dosen, dan mata kuliah</strong>.
      </Typography>
      <div className="py-1" />
      <Typography variant="h3">Dokumentasi</Typography>
      <Typography variant="body1">
        Klik tombol dibawah untuk melihat dokumentasi sekaligus mencoba api
        menggunakan swagger.
      </Typography>
      <Button variant="secondary" size="lg" asChild>
        <a
          href="https://api-informatics-frs-helper.fly.dev/swagger"
          target="_blank"
        >
          Coba API
        </a>
      </Button>
      <div className="py-1" />
      <Typography variant="h3">Resources</Typography>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          <strong>Github</strong>:{" "}
          <a
            className="underline underline-offset-4"
            href="https://github.com/albugowy15/api-informatics-frs-helper"
            target="_blank"
          >
            https://github.com/albugowy15/api-informatics-frs-helper
          </a>
        </li>
        <li>
          <strong>Postman documentation</strong>:{" "}
          <a
            className="underline underline-offset-4"
            href="https://documenter.getpostman.com/view/30505077/2s9YsJBCJo"
            target="_blank"
          >
            https://documenter.getpostman.com/view/30505077/2s9YsJBCJo
          </a>
        </li>
      </ul>
    </main>
  );
}
