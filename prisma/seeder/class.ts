// have a function, take a subject from every semester
// generate min 5 class fot that subject
import { fakerID_ID as faker } from "@faker-js/faker";

import { type Matkul, type Class, type Session } from "@prisma/client";

type ClassSeeder = Omit<Class, "id">;

function seedClass(subjects: Matkul[], sessions: Session[]): ClassSeeder[] {
  const classes: ClassSeeder[] = [];
  for (let semester = 1; semester <= 8; semester++) {
    const subject = subjects.find((item) => item.semester === semester);
    if (!subject) {
      throw new Error(`No subject from ${semester}`);
    }
    const session = sessions[Math.floor(Math.random() * sessions.length)];
    if (!session) {
      throw new Error(`No session found`);
    }

    for (let i = 0; i < 5; i++) {
      const day = faker.date.weekday();
      const code = faker.string.alpha({ length: 1, casing: "upper" });
      const classData: ClassSeeder = {
        matkulId: subject.id,
        day: day,
        code: code,
        sessionId: session.id,
        taken: 0,
      };
      classes.push(classData);
    }
  }
  return classes;
}

export { seedClass };
