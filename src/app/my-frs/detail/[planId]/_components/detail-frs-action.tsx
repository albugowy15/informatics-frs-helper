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

const DetailFrsAction = (props: { frsTitle: string; planId: string }) => {
  const mutateDeleteFrsPlan = api.frs.deletePlan.useMutation({
    onSuccess: () => {
      toast.success("Berhasil menghapus rencana FRS");
      window.location.replace("/my-frs");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleDeleteFrsPlan = () => {
    mutateDeleteFrsPlan.mutate({ planId: props.planId });
  };
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        asChild
        disabled={mutateDeleteFrsPlan.isLoading}
      >
        {mutateDeleteFrsPlan.isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait..
          </>
        ) : (
          <Link href={"/my-frs/edit/" + props.planId}>
            <Pencil className="mr-2 h-4 w-4" />
            Ubah
          </Link>
        )}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            {mutateDeleteFrsPlan.isLoading ? (
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
              disabled={mutateDeleteFrsPlan.isLoading}
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
