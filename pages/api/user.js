import { makeChatId } from "lib/chat/chatId";
import { SUPPORT_ID } from "lib/sharedConstants";
import prisma from "lib/db/prisma";
import { handle } from "lib/api";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
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
