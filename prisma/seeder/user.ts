import { type User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

type UserSeeder = Pick<User, "email" | "username" | "password" | "fullname">;

async function createRandomUser(): Promise<UserSeeder> {
  const hashedPassword = await bcrypt.hash("userPass123", 10);
  return {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: hashedPassword,
    fullname: faker.person.fullName(),
  };
}

async function seedUser(total: number) {
  const usersPromise = Array.from(
    { length: total },
    async () => await createRandomUser(),
  );
  const users = await Promise.all(usersPromise);
  return users;
}

export { createRandomUser, seedUser };
