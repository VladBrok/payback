import prisma from "lib/db/prisma";

export async function getCategory(id) {
  return await prisma.category.findFirst({ where: { id } });
}

export async function getCategories(nameSubstr = undefined) {
  const args = nameSubstr && { where: { name: { contains: nameSubstr } } };
  return await prisma.category.findMany(args);
}
