import prisma from "../lib/prisma.js";
import { MAX_RATING, SUPPORT_ID } from "../lib/sharedConstants.js";
import { createReview } from "../lib/db/createReview.js";
import { randomDate, randomNumber } from "../lib/random.js";
import fetch from "node-fetch";

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async er => {
    console.error(er);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  console.warn("!!! Seeding will delete all data. !!!");
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log("Start seeding ...");
  await clearTables();
  await populateTables();
  console.log("Seeding finished.");
}

async function clearTables() {
  await prisma.message.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.userChat.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.user.deleteMany();
}

async function populateTables() {
  const REVIEW_COUNT = 7;
  const users = await getUsers();
  const categories = await getCategories();
  const products = await getProducts();
  const reviews = await getReviews();

  for (const source of [users, categories, products, reviews]) {
    for (const data of source.data) {
      await (source.create
        ? source.create(data, prisma)
        : prisma[source.table].create({ data }));
    }
  }

  async function getUsers() {
    return {
      data: [
        {
          id: SUPPORT_ID,
          name: "Support",
          image: "/images/support.png",
          isVerified: true,
        },
        ...(
          await (await fetch("https://randomuser.me/api/?results=4")).json()
        ).results.map((u, i) => ({
          id: i + 1 + SUPPORT_ID,
          name: u.login.username,
          image: u.picture.large,
        })),
      ],
      table: "user",
    };
  }

  async function getProducts() {
    return {
      data: (
        await (await fetch("https://fakestoreapi.com/products/")).json()
      ).map((p, i) => ({
        id: i + 1,
        title: p.title,
        description: p.description,
        price: p.price,
        image: p.image,
        isPremium: Math.random() < 0.8,
        isSold: i < REVIEW_COUNT,
        categoryId: categories.data.find(c => c.name == p.category).id,
        userId: randomNumber(1 + SUPPORT_ID, users.data.length),
      })),
      table: "product",
    };
  }

  async function getReviews() {
    const reviewsText = await (
      await fetch(
        `https://randommer.io/api/Text/Review?product=thing&quantity=${REVIEW_COUNT}`,
        {
          method: "POST",
          headers: { "X-Api-Key": process.env.RANDOMMER_API_KEY },
        }
      )
    ).json();
    return {
      data: products.data.slice(0, REVIEW_COUNT).map((p, i) => ({
        id: i + 1,
        buyerId: randomNumber(1 + SUPPORT_ID, users.data.length),
        productId: p.id,
        rating: randomNumber(1, MAX_RATING),
        text: reviewsText[i],
        date: randomDate(5),
      })),
      table: "review",
      create: createReview,
    };
  }

  async function getCategories() {
    return {
      data: [
        { id: 1, name: "electronics", image: "/images/electronics.jpg" },
        { id: 2, name: "jewelery", image: "/images/jewelery.jpg" },
        { id: 3, name: "men's clothing", image: "/images/men.jpg" },
        { id: 4, name: "women's clothing", image: "/images/women.jpg" },
      ],
      table: "category",
    };
  }
}
