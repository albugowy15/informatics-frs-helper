import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { get } from "@vercel/edge-config";

async function ScheduleStatusAlert() {
  const scheduleStatus = await get<"UPDATED" | "OUTDATED">("schedule");
  return (
    <Alert
      variant={scheduleStatus === "UPDATED" ? "default" : "destructive"}
      className="mx-auto mt-8 w-fit"
    >
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>{scheduleStatus}</AlertTitle>
      <AlertDescription>
        {scheduleStatus === "UPDATED"
          ? "Jadwal kelas telah diperbarui, selamat menggunakan!"
          : "Perhatian! Jadwal kelas belum diperbarui."}
      </AlertDescription>
    </Alert>
  );
}

export { ScheduleStatusAlert };
