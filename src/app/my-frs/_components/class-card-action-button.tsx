"use client";

import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { ClassContext } from "@/app/my-frs/_components/class-context";
import { type PlanDetailClass } from "@/app/my-frs/types";
import { api } from "@/trpc/react";

const ClassCardActionButton = ({ data }: { data: PlanDetailClass }) => {
  const context = useContext(ClassContext);
  const [pickClass, setPickClass] = useState<PlanDetailClass>();
  const validateClassTaken = api.frs.validatePlan.useMutation({
    onSuccess: () => {
      if (pickClass) {
        context?.setClassTaken((prev: PlanDetailClass[]) => [
          ...prev,
          pickClass,
        ]);
      }
    },
  });

  const handleTakeClass = (kelas: PlanDetailClass) => {
    const takenClass = context?.classTaken.map((val) => val.id);
    validateClassTaken
      .mutateAsync({
        classTaken: takenClass ?? [],
        incomingClass: kelas.id,
      })
      .then((res) => {
        if (res) {
          toast({
            title: "Success",
            description: "Berhasil mengambil kelas",
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message,
        });
      });

    const data: PlanDetailClass = {
      ...kelas,
      Matkul: kelas.Matkul,
    };
    setPickClass(data);
  };

  return (
    <Button variant="secondary" onClick={() => handleTakeClass(data)}>
      Ambil
    </Button>
  );
};

export default ClassCardActionButton;
