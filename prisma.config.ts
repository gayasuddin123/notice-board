import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "mysql://fyeGqCRoeAzHCse.root:Xex6GFjHCFYngM2r@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/renoassignment?sslaccept=strict",
  },
});