import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const CreateFrsButton = (props: { isReachFRSLimit: boolean }) => {
  return props.isReachFRSLimit ? (
    <Typography variant="body1" className="my-4">
      Kamu tidak dapat membuat plan baru karena telah mencapai maksimal jumlah
      plan yang dapat dibuat sebanyak 3
    </Typography>
  ) : (
    <Button className="my-6" asChild>
      <Link href="/my-frs/create">
        <PlusIcon className="mr-2 h-4 w-4" />
        Tambah Rencana baru
      </Link>
    </Button>
  );
};

export default CreateFrsButton;
