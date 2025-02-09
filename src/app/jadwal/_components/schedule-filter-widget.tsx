import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  ScheduleFilterForm,
  ScheduleFilterFormAction,
} from "./schedule-filter-form";

const ScheduleFilterWidget = () => {
  return (
    <>
      {/* begin -- Filter widget for large screen */}
      <aside className="sticky top-4 hidden h-fit w-[30%] 2xl:w-fit shrink-0 lg:block">
        <Card>
          <CardHeader>
            <CardTitle>Filter Jadwal</CardTitle>
            <CardDescription>
              Silahkan filter jadwal berdasarkan semester dan mata kuliah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScheduleFilterForm>
              <ScheduleFilterFormAction>
                <Button type="submit">Tampilkan Jadwal</Button>
              </ScheduleFilterFormAction>
            </ScheduleFilterForm>
          </CardContent>
        </Card>
      </aside>
      {/* end */}

      {/* begin -- Filter widget for small screen */}
      <section className="mb-7 flex items-center justify-between lg:hidden">
        <Typography variant="h4">Jadwal Kelas</Typography>
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
                <h4 className="font-medium leading-none">Filter Jadwal</h4>
                <p className="text-sm text-muted-foreground">
                  Silahkan filter jadwal berdasarkan semester dan mata kuliah
                </p>
              </div>
              <div className="grid gap-2">
                <ScheduleFilterForm>
                  <ScheduleFilterFormAction>
                    <PopoverClose asChild>
                      <Button type="submit">Tampilkan Jadwal</Button>
                    </PopoverClose>
                  </ScheduleFilterFormAction>
                </ScheduleFilterForm>
              </div>
            </div>
            <div className="overflow-scroll px-2 py-3"></div>
          </PopoverContent>
        </Popover>
      </section>
      {/* end */}
    </>
  );
};

export { ScheduleFilterWidget };
