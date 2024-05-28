import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { PlusIcon } from "@radix-ui/react-icons";
import { type Metadata } from "next";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import MyTradeCard from "./_components/my-trade-card";

export const metadata: Metadata = {
  title: renderPageTitle("myTradeMatkul"),
};

export default async function MyTradeMatkulPage() {
  unstable_noStore();
  const tradeMatkulPosts = await api.tradeMatkul.getAllMyTradeMatkul();

  return (
    <main>
      <Typography variant="h3">My Trade Matkul</Typography>
      <Typography variant="body1">
        Kamu bisa membuat beberapa post trade kelas selama satu semester. Post
        trade matkul yang telah dibuat akan disimpan selama 1 semester dan akan
        dihapus di semester berikutnya.
      </Typography>

      <Button asChild className="my-6">
        <Link href="/my-trade-matkul/create">
          <PlusIcon className="mr-2 h-4 w-4" />
          Tambah Post Trade Matkul
        </Link>
      </Button>

      <div className="grid gap-2 lg:grid-cols-3">
        {tradeMatkulPosts.length > 0 ? (
          tradeMatkulPosts.map((post) => (
            <MyTradeCard post={post} key={post.id} />
          ))
        ) : (
          <Typography variant="body1">
            Kamu belum membuat post trade matkul
          </Typography>
        )}
      </div>
    </main>
  );
}
