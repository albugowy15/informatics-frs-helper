import { Loader2 } from "lucide-react";
import Typography from "./typography";

const Loader = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Typography variant="body1">{message}...</Typography>
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
