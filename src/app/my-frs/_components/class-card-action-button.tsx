"use client";

import { Button } from "@/components/ui/button";
import { ClassContext } from "@/app/my-frs/_components/class-context";
import { type PlanDetailClass } from "@/app/my-frs/types";
import { api } from "@/trpc/react";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

const ClassCardActionButton = ({ data }: { data: PlanDetailClass }) => {
  const context = React.useContext(ClassContext);
  const [pickClass, setPickClass] = React.useState<PlanDetailClass>();
  const { toast } = useToast();
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
