import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScheduleStatus } from "@/config/constants";
import { RocketIcon } from "@radix-ui/react-icons";

async function ScheduleStatusAlert() {
  return (
    <Alert
      variant={ScheduleStatus === "UPDATED" ? "default" : "destructive"}
      className="mx-auto w-fit"
    >
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>{ScheduleStatus}</AlertTitle>
      <AlertDescription>
        {ScheduleStatus === "UPDATED"
          ? "Jadwal kelas telah diperbarui, selamat menggunakan!"
          : "Perhatian! Jadwal kelas belum diperbarui."}
      </AlertDescription>
    </Alert>
  );
}

export { ScheduleStatusAlert };
