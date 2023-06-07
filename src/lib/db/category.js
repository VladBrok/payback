import prisma from "lib/db/prisma";

export async function getCategory(id) {
  return await prisma.category.findFirst({ where: { id } });
}

export async function getCategories(searchQuery = undefined) {
  const args = searchQuery && { where: { name: { contains: searchQuery } } };
  return await prisma.category.findMany(args);
}
