import { env } from "@/env.mjs";
import { PrismaClient } from "@prisma/client";
import { connect } from "@tidbcloud/serverless";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";

const connection = connect({ url: env.DATABASE_URL });

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    // @ts-expect-error ignore adapter name
    adapter: new PrismaTiDBCloud(connection),
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();
export default prisma;

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
