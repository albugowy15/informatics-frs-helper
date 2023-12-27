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
import { api } from "@/trpc/react";
import { toast } from "sonner";

const TradeMatkulAction = (props: { tradeMatkulId: string }) => {
  const mutateDeleteTradeMatkul =
    api.tradeMatkul.deleteMyTradeMatkul.useMutation({
      onSuccess: () => {
        toast.success("Berhasil menghapus Trade matkul");
        window.location.replace("/my-trade-matkul");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const handleDeleteTradeMatkul = () => {
    mutateDeleteTradeMatkul.mutate({ tradeMatkulId: props.tradeMatkulId });
  };
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        asChild
        disabled={mutateDeleteTradeMatkul.isLoading}
      >
        <Link href={"/my-trade-matkul/edit/" + props.tradeMatkulId}>
          <Pencil className="mr-2 h-4 w-4" />
          Update
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={mutateDeleteTradeMatkul.isLoading}
          >
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
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              disabled={mutateDeleteTradeMatkul.isLoading}
              onClick={handleDeleteTradeMatkul}
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TradeMatkulAction;
