import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

let prisma;

function makeClient() {
  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  });

  const adapter = new PrismaLibSQL(libsql);
  return new PrismaClient({ adapter });
}

if (process.env.NODE_ENV === "production") {
  prisma = makeClient();
} else {
  if (!global.prisma) {
    global.prisma = makeClient();
  }
  prisma = global.prisma;
}

export default prisma;
