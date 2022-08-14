import prisma from "lib/db/prisma";

export default async function handler(req, res) {
  let handle;

  if (req.method === "GET") {
    handle = handleGet;
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
  const id = req.query.id == undefined ? undefined : +req.query.id;
  const nameSubstr = req.query.nameSubstr;

  if (id != null) {
    const category = await prisma.category.findFirst({ where: { id } });
    res.status(200).json(category);
  } else {
    const args = nameSubstr
      ? { where: { name: { contains: nameSubstr } } }
      : undefined;
    const categories = await prisma.category.findMany(args);
    res.status(200).json(categories);
  }
}
