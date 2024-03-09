import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

let prisma;

function makeClient() {
  const libsql = createClient({
    // syncUrl: `${process.env.TURSO_DATABASE_URL}`,
    // url: "file:./prisma/dev.db",
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  });

  const adapter = new PrismaLibSQL(libsql);
  const client = new PrismaClient({ adapter });
  client.$use(async (params, next) => {
    // await libsql.sync();
    const result = await next(params);
    return result;
  });
  return client;
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
