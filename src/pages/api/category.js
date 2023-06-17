import { handle } from "lib/api/server";
import { getCategories, getCategory } from "lib/db/category";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
  });
}

async function handleGet(req, res) {
  const id = req.query.id == undefined ? undefined : +req.query.id;
  const searchQuery = req.query.searchQuery;

  if (id != null) {
    const category = await getCategory(id);
    if (!category) {
      res.status(404).end();
    } else {
      res.status(200).json(category);
    }
  } else {
    res.status(200).json(await getCategories(searchQuery));
  }
}
handleGet.allowUnauthorized = true;
