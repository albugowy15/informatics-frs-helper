import { UpdateIcon } from "@radix-ui/react-icons";
import Typography from "@/components/typography";

export default function Loading() {
  return (
    <div className="mt-28 flex flex-col items-center justify-center gap-2">
      <Typography variant="body1">Please wait...</Typography>
      <UpdateIcon className="h-10 w-10 animate-spin" />
    </div>
  );
}
