import Typography from "@/components/typography";
import { type RouterOutputs } from "@/trpc/react";
import Link from "next/link";

const FrsPlanCard = (props: {
  plan: RouterOutputs["frs"]["getAllPlans"][0];
}) => {
  return (
    <div className="rounded-md border p-4">
      <Link
        href={"/my-frs/detail/" + props.plan.id}
        className="text-xl font-semibold hover:underline"
      >
        {props.plan.title}
      </Link>
      <Typography variant="body1">Semester {props.plan.semester}</Typography>
      <Typography variant="body1">{props.plan.totalSks} sks</Typography>
    </div>
  );
};

export default FrsPlanCard;
