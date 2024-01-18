"use client";

import { UpdateIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
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
import { useToastMutate } from "@/lib/hooks";
import { deleteMyTradeMatkulAction } from "../actions";

const TradeMatkulAction = (props: { tradeMatkulId: string }) => {
  const mutation = useToastMutate({
    success: "Berhasil menghapus Trade matkul",
    loading: "Menghapus trade matkul",
  });

  const handleDeleteTradeMatkul = () => {
    mutation.mutate(
      deleteMyTradeMatkulAction({ tradeMatkulId: props.tradeMatkulId }),
    );
  };
  return (
    <div className="flex gap-2">
      <Button variant="secondary" asChild disabled={mutation.isLoading}>
        <Link href={"/my-trade-matkul/edit/" + props.tradeMatkulId}>
          <Pencil1Icon className="mr-2 h-4 w-4" />
          Update
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={mutation.isLoading}>
            {mutation.isLoading ? (
              <>
                <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait..
              </>
            ) : (
              <>
                <TrashIcon className="mr-2 h-4 w-4" />
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
              disabled={mutation.isLoading}
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
