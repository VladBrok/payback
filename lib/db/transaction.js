export async function transaction(prisma, callback) {
  return await prisma.$transaction(callback, { maxWait: 5000, timeout: 10000 });
}
