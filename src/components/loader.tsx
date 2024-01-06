import Typography from "./typography";
import { UpdateIcon } from "@radix-ui/react-icons";

const Loader = (props: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Typography variant="body1">{props.message}...</Typography>
      <UpdateIcon className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
