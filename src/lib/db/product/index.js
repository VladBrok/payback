import prisma from "lib/db/prisma";
import { withPagination } from "lib/db/withPagination";
import { PRODUCT_PAGE_SIZE } from "lib/sharedConstants";
import { enrichUser } from "lib/db/user";
import { processOrder } from "lib/payment/server";
import { postBlob } from "lib/api/client";
import { transaction } from "lib/db/transaction";
import FormData from "form-data";

export async function getProduct(id) {
  const product = await prisma.product.findFirst({
    where: { id },
    include: { category: true, user: true },
  });

  if (product) {
    await enrichUser(product.user.id, product.user);
  }

  return product;
}

export async function getProducts(filter, pageCursor) {
  return await withPagination(
    prisma.product.findMany,
    {
      where: pageCursor
        ? { AND: [filter, { id: { lt: +pageCursor } }] }
        : filter,
      include: { category: true },
      orderBy: { id: "desc" },
    },
    PRODUCT_PAGE_SIZE
  );
}

export async function createProduct(
  { isPremium, paymentData, title, description, price, photoBlob, category },
  sessionUser
) {
  await transaction(prisma, async prisma => {
    if (isPremium) {
      await processOrder(paymentData);
    }

    const formData = new FormData();
    formData.append("image", photoBlob.slice(photoBlob.indexOf(",") + 1));

    const json = await postBlob(
      `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_HOSTING_API_KEY}`,
      formData
    );

    const image = json.data.image.url;
    await prisma.product.create({
      data: {
        title,
        description,
        image,
        price,
        isPremium,
        user: { connect: { id: +sessionUser.id } },
        category: { connect: { id: +category } },
      },
    });
  });
}

export async function updateProduct(data, id) {
  return await prisma.product.update({
    where: { id },
    data,
    include: { user: true },
  });
}
