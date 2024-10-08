export const Semester = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const SemesterWithKey = Semester.map((item) => ({
  id: crypto.randomUUID(),
  value: item,
}));

export const ScheduleStatus: "UPDATED" | "OUTDATED" = "UPDATED";
