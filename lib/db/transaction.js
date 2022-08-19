import prisma from "lib/db/prisma";

export async function transaction(callback) {
  return await prisma.$transaction(callback, { maxWait: 5000, timeout: 10000 });
}
