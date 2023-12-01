import ClassCard from "@/components/class-card";
import Typography from "@/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/trpc/server";
import ClassCardActionButton from "../my-frs/_components/class-card-action-button";

const ClassAccordion = async ({
  semester,
  subject,
  withAction = false,
}: {
  semester?: string;
  subject?: string;
  withAction?: boolean;
}) => {
  const classes = await api.common.getClass.query({
    semester: semester === undefined ? parseInt("1") : parseInt(semester),
    matkul: subject === "Semua" || subject === undefined ? undefined : subject,
    with_taken: true,
  });

  return (
    <>
      {classes.length == 0 ? (
        <Typography variant="h4" className="text-center lg:text-left">
          Tidak ada kelas
        </Typography>
      ) : null}
      {classes.map((matkul) => (
        <Accordion type="single" collapsible key={matkul.id}>
          <AccordionItem value={matkul.name}>
            <AccordionTrigger>
              <div className="text-left">
                <Typography variant="body1">{matkul.name}</Typography>
                <Typography variant="label1">
                  Semester {matkul.semester} | {matkul.sks} sks |{" "}
                  {matkul.Class.length} kelas
                </Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 md:grid-cols-3">
                {matkul.Class.length == 0 ? (
                  <Typography variant="body1">Tidak ada kelas</Typography>
                ) : (
                  <>
                    {matkul.Class.map((item) => (
                      <ClassCard
                        data={{
                          day: item.day,
                          lecturers: item.Lecturer,
                          sessionTime: item.Session?.session_time,
                          subjectCode: item.code,
                          subjectName: matkul.name,
                          taken: item.taken,
                          sks: matkul.sks,
                        }}
                        key={item.id}
                      >
                        {withAction ? (
                          <ClassCardActionButton
                            data={{ Matkul: matkul, ...item }}
                          />
                        ) : null}
                      </ClassCard>
                    ))}
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default ClassAccordion;
