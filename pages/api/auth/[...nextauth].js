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
        // fixme: reviewCount, rating and money are not updated
        console.log("fetch start");
        const baseUrl = process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL;
        console.log(baseUrl);

        const response = await fetch(`${baseUrl}/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        });

        if (response.ok) {
          const fetchedUser = await response.json();
          console.log(fetchedUser);
          token.id = fetchedUser.id;
          token.reviewCount = fetchedUser.reviewCount;
          token.rating = fetchedUser.rating;
          token.money = fetchedUser.money;
          console.log("fetch end");
        } else {
          console.log("fetch end not ok");
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.rating = token.rating;
        session.user.reviewCount = token.reviewCount;
        session.user.money = token.money;
      }
      return session;
    },
  },
  pages: {
    signIn: "/profile/signIn",
    error: "/profile/signIn",
  },
};

export default NextAuth(authOptions);
