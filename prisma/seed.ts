import { PrismaClient } from "@prisma/client";
import { seedUser } from "./seeder/user";
import { sessions } from "./seeder/session";
import { lecturers } from "./seeder/lecturer";
import { subjects } from "./seeder/subject";
import { seedClass } from "./seeder/class";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$queryRaw`DELETE FROM _ClassToPlan`;
    await prisma.$queryRaw`DELETE FROM _ClassToLecturer`;
    await prisma.class.deleteMany();
    await prisma.user.deleteMany();
    await prisma.session.deleteMany();
    await prisma.lecturer.deleteMany();
    await prisma.matkul.deleteMany();

    const users = await seedUser(50);
    await prisma.user.createMany({
      data: users,
    });

    await prisma.session.createMany({ data: sessions });
    const sessionReturned = await prisma.session.findMany();

    await prisma.lecturer.createMany({ data: lecturers });
    const lecturerReturned = await prisma.lecturer.findMany({
      select: {
        id: true,
      },
    });

    await prisma.matkul.createMany({ data: subjects });
    const subjectReturned = await prisma.matkul.findMany();

    const classesData = seedClass(subjectReturned, sessionReturned);
    classesData.forEach((item) => {
      const lecturer =
        lecturerReturned[Math.floor(Math.random() * lecturerReturned.length)];
      prisma.class
        .create({
          data: {
            Lecturer: {
              connect: [
                {
                  id: lecturer?.id,
                },
              ],
            },
            ...item,
          },
        })
        .catch((e) => {
          console.error(e);
          throw new Error("Error create a class");
        });
    });
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
