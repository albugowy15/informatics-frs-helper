import ClassCard from "@/components/class-card";
import Typography from "@/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/trpc/server";
import ClassCardActionButton from "./class-card-action-button";

const ClassAccordion = async ({
  semester,
  subject,
}: {
  semester?: string;
  subject?: string;
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
        <>
          <Accordion type="single" collapsible>
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
                    <>
                      <Typography variant="body1">Tidak ada kelas</Typography>
                    </>
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
                          size="sm"
                          key={item.id}
                        >
                          <ClassCardActionButton
                            data={{ Matkul: matkul, ...item }}
                          />
                        </ClassCard>
                      ))}
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ))}
    </>
  );
};

export default ClassAccordion;
