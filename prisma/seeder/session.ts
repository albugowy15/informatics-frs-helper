import { type Session } from "@prisma/client";

const sessions: Pick<Session, "session_time">[] = [
  { session_time: "07.00-09.00" },
  { session_time: "08.00-10.00" },
  { session_time: "09.00-11.00" },
  { session_time: "10.00-12.00" },
  { session_time: "11.00-13.00" },
  { session_time: "12.00-14.00" },
  { session_time: "13.00-15.00" },
  { session_time: "13.30-15.30" },
  { session_time: "14.00-16.00" },
  { session_time: "14.30-16.30" },
  { session_time: "15.00-17.00" },
  { session_time: "15.30-17.30" },
  { session_time: "16.00-18.00" },
  { session_time: "16.30-18.30" },
  { session_time: "17.00-19.00" },
  { session_time: "17.30-19.30" },
  { session_time: "18.00-20.00" },
  { session_time: "18.30-20.30" },
  { session_time: "19.30-21.30" },
  { session_time: "20.30-22.30" },
];

export { sessions };
