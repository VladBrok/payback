import prisma from "lib/db/prisma";
import { toMegabytes } from "lib/file";
import {
  BYTES_IN_MEGABYTE,
  MAX_FILE_SIZE_IN_BYTES,
  PRODUCT_PAGE_SIZE,
} from "lib/sharedConstants";
import { processOrder } from "lib/payment/server";
import { handle, withPagination } from "lib/api/server";
import { postBlob } from "lib/api/client";
import { enrichUser } from "lib/db/enrichUser";
import { transaction } from "lib/db/transaction";
import FormData from "form-data";

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

  await enrichUser(product.user.id, product.user);
  res.status(200).json(product);
}
handleGet.allowUnauthorized = true;

async function handlePost(req, res, session) {
  const data = req.body;
  if (data.filter) {
    await getProducts();
  } else {
    await createProduct();
  }

  async function getProducts() {
    const pageCursor = req.query.pageCursor;

    const result = await withPagination(
      prisma.product.findMany,
      {
        where:
          pageCursor != ""
            ? { AND: [data.filter, { id: { lt: +pageCursor } }] }
            : data.filter,
        include: { category: true },
        orderBy: { id: "desc" },
      },
      PRODUCT_PAGE_SIZE
    );

    res.status(200).json(result);
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
