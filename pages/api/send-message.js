import { pusher } from "lib/chat/server";

export default async function handler(req, res) {
  const message = req.body;
  await pusher.trigger("my-channel", "my-event", message);
  res.status(200).json("");
}
