import { toMegabytes } from "lib/file";
import { BYTES_IN_MEGABYTE, MAX_FILE_SIZE_IN_BYTES } from "lib/sharedConstants";
import { handle } from "lib/api/server";
import { getProduct, getProducts, createProduct } from "lib/db/product";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(req, res) {
  const id = +req.query.id;
  const product = await getProduct(id);

  if (!product) {
    res.status(404).end();
    return;
  }

  res.status(200).json(product);
}
handleGet.allowUnauthorized = true;

async function handlePost(req, res, sessionUser) {
  const data = req.body;
  const pageCursor = req.query.pageCursor;

  if (data.filter) {
    res.status(200).json(await getProducts(data.filter, pageCursor));
  } else {
    if (!sessionUser) {
      res.status(401).end();
      return;
    }

    await createProduct(data, sessionUser);
    res.status(200).end();
  }
}
handlePost.allowUnauthorized = true;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
