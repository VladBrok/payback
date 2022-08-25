import { fillDatabase } from "lib/db/fill";

export default async function handler(req, res) {
  if (process.env.NODE_ENV !== "development") {
    res.status(400).json({ error: "Allowed only in development environment" });
    return;
  }

  const pwd = req.query.pwd;
  if (process.env.PASSWORD !== pwd) {
    res.status(400).json({ error: "Invalid password" });
    return;
  }

  try {
    await fillDatabase();
    res.status(200).json({ message: "Success. Now you need to sign in again" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fill the database" });
  }
}
