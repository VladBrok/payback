import prisma from "lib/db/prisma";
import FormData from "form-data";
import { toMegabytes } from "lib/file";
import { BYTES_IN_MEGABYTE, MAX_FILE_SIZE_IN_BYTES } from "lib/sharedConstants";
import { processOrder } from "lib/payment/server";
import { handle } from "lib/api/server";

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

  // fixme: dup
  const reviewCount = await prisma.review.count({
    where: { product: { userId: product.user.id } },
  });
  product.user.reviewCount = reviewCount;
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
    // fixme: add pagination (to chats and messages too)
    const products = await prisma.product.findMany({
      where: data.filter,
      include: { category: true },
    });
    res.status(200).json(products);
  }

  async function createProduct() {
    if (!session) {
      res.status(401).end();
      return;
    }

    if (data.isPremium) {
      await processOrder(data.paymentData);
    }

    const formData = new FormData();
    formData.append(
      "image",
      data.photoBlob.slice(data.photoBlob.indexOf(",") + 1)
    );
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_HOSTING_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const json = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }

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
