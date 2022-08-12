import { makeChatId } from "lib/chat/chatId";
import prisma from "lib/prisma";

const SUPPORT_ID = 1;

// todo: protect with next-auth
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await handlePost(req, res);
    } catch (er) {
      console.log(er);
      res.status(500).json({ error: "Error" });
    }
  } else if (req.method === "GET") {
    try {
      await handleGet(req, res);
    } catch (er) {
      console.log(er);
      res.status(500).json({ error: "Error" });
    }
  } else {
    res.status(400).json({ error: `Method ${req.method} is not supported.` });
  }
}

async function handleGet(req, res) {
  const id = +req.query.id;
  const user = await prisma.user.findFirst({
    where: { id },
  });
  const reviewCount = await prisma.review.count({
    where: { product: { userId: id } },
  });
  res.status(200).json({ ...user, reviewCount });
}

async function handlePost(req, res) {
  const data = req.body;
  let user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (user == null) {
    user = await createUser(data);
  }

  // fixme: dup with handleGet
  const reviewCount = await prisma.review.count({
    where: { product: { userId: user.id } },
  });
  res.status(200).json({ ...user, reviewCount });
}

async function createUser(data) {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      image: data.image,
      email: data.email,
    },
  });

  const chatId = makeChatId([SUPPORT_ID, user.id]);
  await prisma.userChat.create({
    data: {
      chat: { create: { id: chatId } },
      user: { connect: { id: user.id } },
    },
  });
  await prisma.userChat.create({
    data: {
      chat: { connect: { id: chatId } },
      user: { connect: { id: SUPPORT_ID } },
    },
  });

  return user;
}
