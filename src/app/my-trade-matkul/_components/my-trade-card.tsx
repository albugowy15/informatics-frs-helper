import Typography from "@/components/typography";
import TradeMatkulAction from "./trade-matkul-action";
import { type RouterOutputs } from "@/utils/api";

const MyTradeCard = (props: {
  post: RouterOutputs["tradeMatkul"]["getAllMyTradeMatkul"][0];
}) => {
  return (
    <div className="flex flex-col rounded-md border p-3">
      <Typography variant="body1">
        <span className="font-semibold text-red-600">Want</span> :{" "}
        {props.post.searchMatkul.Matkul.name} {props.post.searchMatkul.code}
      </Typography>
      <Typography variant="body1">
        <span className="font-semibold text-green-600">Have</span> :{" "}
        {props.post.hasMatkul.Matkul.name} {props.post.hasMatkul.code}
      </Typography>
      <Typography variant="body1">{props.post.description}</Typography>

      <div className="py-2" />
      <TradeMatkulAction tradeMatkulId={props.post.id} />
    </div>
  );
};

export default MyTradeCard;
