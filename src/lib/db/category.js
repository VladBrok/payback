import prisma from "lib/db/prisma";
import {
  initializeFuzzySearch,
  isFuzzySearchInitialized,
  fuzzySearch,
} from "lib/fuzzySearch/fuzzySearch";

export async function getCategory(id) {
  return await prisma.category.findFirst({ where: { id } });
}

export async function getCategories(searchQuery = undefined) {
  const categories = await prisma.category.findMany();

  if (!isFuzzySearchInitialized()) {
    initializeFuzzySearch(categories, category => category.name);
  }

  const filtered = fuzzySearch(
    categories,
    category => category.name,
    searchQuery
  );

  return filtered;
}
