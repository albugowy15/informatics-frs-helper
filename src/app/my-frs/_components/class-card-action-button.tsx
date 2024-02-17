"use client";

import { Button } from "@/components/ui/button";
import { useClassContext } from "@/app/my-frs/_components/class-context";
import { type PlanDetailClass } from "@/app/my-frs/types";
import { api } from "@/trpc/react";
import React from "react";
import { toast } from "sonner";

const ClassCardActionButton = (props: { data: PlanDetailClass }) => {
  const classContext = useClassContext();
  const [pickClass, setPickClass] = React.useState<PlanDetailClass>();
  const validateClassTaken = api.frs.validatePlan.useMutation({
    onSuccess: () => {
      if (pickClass) {
        classContext.setClassTaken((prev: PlanDetailClass[]) => [
          ...prev,
          pickClass,
        ]);
      }
      toast.success("Berhasil mengambil kelas");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleTakeClass = (kelas: PlanDetailClass) => {
    const takenClass = classContext.classTaken.map((val) => val.id);
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
    <Button
      variant="secondary"
      size="sm"
      onClick={() => handleTakeClass(props.data)}
    >
      Ambil
    </Button>
  );
};

export default ClassCardActionButton;
