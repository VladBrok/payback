import { makeChatId } from "lib/chat/chatId";
import { SUPPORT_ID } from "lib/sharedConstants";
import prisma from "lib/db/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";

const TIMEOUT = { httpOptions: { timeout: 10000 } };

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      ...TIMEOUT,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
      ...TIMEOUT,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const receivedUser = await createOrGetUser({
          email: user.email,
          name: user.name,
          image: user.image,
        });

        token.id = receivedUser.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/profile/signIn",
    error: "/profile/signIn",
  },
};

async function createOrGetUser(data) {
  // fixme: use upsert ?
  let user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (user == null) {
    user = await createUser(data);
  }

  return user;
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

export default NextAuth(authOptions);
