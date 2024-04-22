"use client";

import { useClassContext } from "@/app/my-frs/_components/class-context";
import { type PlanDetailClass } from "@/app/my-frs/types";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import React from "react";
import { toast } from "sonner";

const ClassCardActionButton = (props: { data: PlanDetailClass }) => {
  const classContext = useClassContext();
  const [pickClass, setPickClass] = React.useState<PlanDetailClass>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      loading={isLoading}
      onClick={() => handleTakeClass(props.data)}
    >
      Ambil
    </Button>
  );
};

export default ClassCardActionButton;
