import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

function createPrismaClient() {
  const adapter = new PrismaMariaDb({
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    port: 4000,
    user: "fyeGqCRoeAzHCse.root",
    password: "Xex6GFjHCFYngM2r",
    database: "renoassignment",
    ssl: {
      rejectUnauthorized: false,
    },
    connectionLimit: 5,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}