import Typography from "@/components/typography";
import { UpdateIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className="mt-28 flex flex-col items-center justify-center gap-2">
      <Typography variant="body1">Tunggu...</Typography>
      <UpdateIcon className="h-10 w-10 animate-spin" />
    </div>
  );
}
