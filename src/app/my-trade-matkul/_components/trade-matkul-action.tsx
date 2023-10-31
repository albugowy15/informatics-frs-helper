"use client";

import { Loader2, Pencil, Trash } from "lucide-react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { api } from "@/trpc/react";

const TradeMatkulAction = ({ tradeMatkulId }: { tradeMatkulId: string }) => {
  const mutateDeleteTradeMatkul =
    api.tradeMatkul.deleteMyTradeMatkul.useMutation({
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasil menghapus Trade matkul",
        });
        window.location.replace("/my-frs");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    });
  const handleDeleteTradeMatkul = () => {
    mutateDeleteTradeMatkul.mutate({ tradeMatkulId: tradeMatkulId });
  };
  return (
    <div className="flex gap-2">
      <Button variant="secondary" asChild>
        <Link href={"/my-trade-matkul/edit/" + tradeMatkulId}>
          <Pencil className="mr-2 h-4 w-4" />
          Update
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            {mutateDeleteTradeMatkul.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait..
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" />
                Hapus
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Anda yakin menghapus Trade Matkul ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Anda benar-benar yakin ingin menghapus Trade Matkul ini? Tindakan
              ini akan menghapus Trade matkul tersebut secara permanen dari akun
              Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Batal</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                disabled={mutateDeleteTradeMatkul.isLoading}
                onClick={handleDeleteTradeMatkul}
              >
                Ya, Hapus
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TradeMatkulAction;
