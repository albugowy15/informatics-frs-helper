import { env } from "@/env.mjs";
import { PrismaClient } from "@prisma/client";
import { Client } from "@planetscale/database";
import { fetch as undiciFetch } from "undici";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";

const prismaClientSingleton = () => {
  const client = new Client({ url: env.DATABASE_URL, fetch: undiciFetch });
  const adapter = new PrismaPlanetScale(client);
  return new PrismaClient({
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    adapter,
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
