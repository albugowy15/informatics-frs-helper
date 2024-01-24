import Typography from "@/components/typography";
import { type RouterOutputs } from "@/trpc/shared";

const TradeCard = (props: {
  trade: RouterOutputs["tradeMatkul"]["getAllTradeMatkul"][0];
}) => {
  return (
    <div className="rounded-md border p-4">
      <Typography variant="body1" className="font-medium">
        {props.trade.User?.fullname}
      </Typography>
      <Typography variant="label1">{props.trade.User?.username}</Typography>
      <div className="py-1" />
      <Typography variant="body1">
        <span className="font-medium text-red-600">Want</span> :{" "}
        {props.trade.searchMatkul.Matkul.name} {props.trade.searchMatkul.code}
      </Typography>
      <Typography variant="body1" className="[&:not(:first-child)]:mt-0">
        <span className="font-medium text-green-600">Have</span> :{" "}
        {props.trade.hasMatkul.Matkul.name} {props.trade.hasMatkul.code}
      </Typography>
      <Typography variant="body1">{props.trade.description}</Typography>
      <Typography variant="body1" className="font-medium">
        Kontak
      </Typography>
      <div className="flex items-center gap-4">
        <Typography variant="label1" className="leading-6">
          WA : {props.trade.User?.whatsapp ? props.trade.User.whatsapp : "-"}
        </Typography>
        <Typography variant="label1" className="leading-6">
          Line : {props.trade.User?.idLine ? props.trade.User.idLine : "-"}
        </Typography>
      </div>
    </div>
  );
};

export default TradeCard;
