import prisma from "lib/prisma";

// fixme: change error codes
// fixme: protect with next-auth
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await handleGet(req, res);
    } catch (er) {
      console.log(er);
      res.status(500).json({ error: "Failed to get chats" });
    }
  } else {
    res.status(400).json({ error: `Method ${req.method} is not supported.` });
  }
}

async function handleGet(req, res) {
  const userId = +req.query.userId;
  const chats = await prisma.chat.findMany({
    where: { users: { some: { userId } } },
    select: {
      id: true,
      users: {
        where: { NOT: { userId } },
        select: { user: { select: { image: true, name: true } } },
      },
    },
  });

  res.status(200).json(
    chats.map(c => ({
      id: c.id,
      image: c.users[0].user.image,
      name: c.users[0].user.name,
    }))
  );
}
