import prisma from "lib/prisma";
import FormData from "form-data";

// fixme: change error codes
// fixme: protect with next-auth
// fixme: dup
export default async function handler(req, res) {
  let handle;

  if (req.method === "GET") {
    handle = handleGet;
  } else if (req.method === "POST") {
    handle = handlePost;
  } else {
    res.status(400).json({ error: `Method ${req.method} is not supported.` });
    return;
  }

  try {
    await handle(req, res);
  } catch (er) {
    console.log(er);
    res.status(500).json({ error: "Fail" });
  }
}

async function handleGet(req, res) {
  const id = +req.query.id;
  const product = await prisma.product.findFirst({
    where: { id },
    include: { category: true, user: { include: { reviews: true } } },
  });
  res.status(200).json(product);
}

async function handlePost(req, res) {
  const data = req.body;
  if (data.filter) {
    console.log(data);
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
      throw new Error();
    }

    const image = json.data.image.url;
    await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        image,
        price: data.price,
        isPremium: data.isPremium,
        user: { connect: { id: +data.userId } },
        category: { connect: { id: +data.category } },
      },
    });
    res.status(200).json("");
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
