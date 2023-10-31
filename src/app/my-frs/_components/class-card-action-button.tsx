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
      toast({
        title: "Success",
        description: "Berhasil mengambil kelas",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleTakeClass = (kelas: PlanDetailClass) => {
    const takenClass = context?.classTaken.map((val) => val.id);
    validateClassTaken.mutate({
      classTaken: takenClass ?? [],
      incomingClass: kelas.id,
    });

    const data: PlanDetailClass = {
      ...kelas,
      Matkul: kelas.Matkul,
    };
    setPickClass(data);
  };

  return (
    <Button variant="secondary" size="sm" onClick={() => handleTakeClass(data)}>
      Ambil
    </Button>
  );
};

export default ClassCardActionButton;
