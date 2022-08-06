import { pusher } from "lib/chat/server";
import { EVENTS, CHANNELS } from "lib/chat/constants";

export default async function handler(req, res) {
  const message = req.body;
  await pusher.trigger(CHANNELS.TEST, EVENTS.MESSAGE, message);
  res.status(200).json("");
}
