import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TradingFilterForm from "./trading-filter-form";
import { Button } from "@/components/ui/button";
import Typography from "@/components/typography";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

const TradeFilterWidget = () => {
  return (
    <>
      <aside className="sticky top-4 hidden h-fit w-[26%] flex-shrink-0 lg:block">
        <Card>
          <CardHeader>
            <CardTitle>Filter Trading Kelas</CardTitle>
            <CardDescription>
              Silahkan filter trading kelas berdasarkan semester dan mata kuliah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TradingFilterForm
              submitAction={
                <Button type="submit">Tampilkan Trading Matkul</Button>
              }
            />
          </CardContent>
        </Card>
      </aside>
      <section className="mb-7 flex items-center justify-between lg:hidden">
        <Typography variant="h4">Trade Matkul</Typography>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filter Trading</h4>
                <p className="text-sm text-muted-foreground">
                  Silahkan filter trading kelas berdasarkan semester dan mata
                  kuliah
                </p>
              </div>
              <div className="grid gap-2">
                <TradingFilterForm
                  submitAction={
                    <PopoverClose asChild>
                      <Button type="submit">Tampilkan Trading Matkul</Button>
                    </PopoverClose>
                  }
                />
              </div>
            </div>
            <div className="overflow-scroll px-2 py-3"></div>
          </PopoverContent>
        </Popover>
      </section>
    </>
  );
};

export default TradeFilterWidget;
