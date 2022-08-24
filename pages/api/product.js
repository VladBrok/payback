import prisma from "lib/db/prisma";
import { toMegabytes } from "lib/file";
import { BYTES_IN_MEGABYTE, MAX_FILE_SIZE_IN_BYTES } from "lib/sharedConstants";
import { processOrder } from "lib/payment/server";
import { handle } from "lib/api/server";
import { postBlob } from "lib/api/client";
import { enrichUser } from "lib/db/user";
import { transaction } from "lib/db/transaction";
import FormData from "form-data";
import { getProducts } from "lib/db/product";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(req, res) {
  const id = +req.query.id;
  const product = await prisma.product.findFirst({
    where: { id },
    include: { category: true, user: true },
  });

  if (!product) {
    res.status(404).end();
    return;
  }

  await enrichUser(product.user.id, product.user);
  res.status(200).json(product);
}
handleGet.allowUnauthorized = true;

async function handlePost(req, res, session) {
  const data = req.body;
  const pageCursor = req.query.pageCursor;

  if (data.filter) {
    res.status(200).json(await getProducts(data.filter, pageCursor));
  } else {
    await createProduct();
  }

  async function createProduct() {
    if (!session) {
      res.status(401).end();
      return;
    }

    await transaction(prisma, async prisma => {
      if (data.isPremium) {
        await processOrder(data.paymentData);
      }

      const formData = new FormData();
      formData.append(
        "image",
        data.photoBlob.slice(data.photoBlob.indexOf(",") + 1)
      );

      const json = await postBlob(
        `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_HOSTING_API_KEY}`,
        formData
      );

      const image = json.data.image.url;
      await prisma.product.create({
        data: {
          title: data.title,
          description: data.description,
          image,
          price: data.price,
          isPremium: data.isPremium,
          user: { connect: { id: +session.user.id } },
          category: { connect: { id: +data.category } },
        },
      });
    });

    res.status(200).end();
  }
}
handlePost.allowUnauthorized = true;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: `${toMegabytes(MAX_FILE_SIZE_IN_BYTES + BYTES_IN_MEGABYTE)}mb`,
    },
  },
};
