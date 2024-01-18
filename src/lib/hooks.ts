import React from "react";
import { toast } from "sonner";

interface ToastOptions {
  loading?: string;
  success: string;
  error?: string;
}

export const useToastMutate = (options?: ToastOptions) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const mutate = (mutateFn: Promise<{ error: string } | undefined>) => {
    setIsLoading(true);
    mutateFn
      .then((res) => {
        res?.error
          ? toast.error(options?.error ? options.error : res.error)
          : toast.success(options ? options.success : "Berhasil");
      })
      .catch(() => {
        toast.error("Unknown error");
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, mutate };
};
