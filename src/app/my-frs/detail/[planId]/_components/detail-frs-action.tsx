"use client";

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
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { deletePlanAction } from "../actions";

const DetailFrsAction = (props: { frsTitle: string; planId: string }) => {
  const mutation = useToastMutate({
    success: "Berhasil menghapus rencana FRS",
    loading: "Menghapus rencana FRS",
    redirect: "/my-frs",
  });

  const handleDeleteFrsPlan = () => {
    mutation.mutate(deletePlanAction({ planId: props.planId }));
  };
  return (
    <div className="flex items-center gap-3">
      <Button variant="secondary" asChild loading={mutation.isLoading}>
        <Link href={"/my-frs/edit/" + props.planId}>
          <Pencil1Icon className="mr-2 h-4 w-4" />
          Ubah
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" loading={mutation.isLoading}>
            <TrashIcon className="mr-2 h-4 w-4" />
            Hapus
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Anda yakin menghapus plan FRS ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Anda benar-benar yakin ingin menghapus rencana FRS :{" "}
              <span className="font-bold text-orange-600">
                {props.frsTitle}
              </span>
              ? Tindakan ini akan menghapus rencana FRS tersebut secara permanen
              dari akun Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFrsPlan}
              disabled={mutation.isLoading}
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DetailFrsAction;
