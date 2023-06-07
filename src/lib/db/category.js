import prisma from "lib/db/prisma";
import { fuzzySearch } from "lib/fuzzySearch";

export async function getCategory(id) {
  return await prisma.category.findFirst({ where: { id } });
}

export async function getCategories(searchQuery = undefined) {
  const categories = await prisma.category.findMany();
  const filtered = fuzzySearch(
    categories,
    category => category.name,
    searchQuery
  );
  return filtered;
}
