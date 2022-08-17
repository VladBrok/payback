import { EVENTS, CHANNELS } from "lib/chat/constants";
import Pusher from "pusher-js/with-encryption";

export function connect(chats, userId, onMessage, onChat) {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "api/auth/chat",
  });

  chats.forEach(c => {
    const messageChannel = pusher.subscribe(
      `${CHANNELS.ENCRYPTED_BASE}${c.id}`
    );
    messageChannel.bind(EVENTS.SUBSCRIPTION_ERROR, er =>
      console.log("subscription error", er)
    );
    messageChannel.bind(EVENTS.MESSAGE, onMessage);
  });

  const chatChannelName = `${CHANNELS.ENCRYPTED_BASE}${userId}`;
  const chatChannel = pusher.subscribe(chatChannelName);
  chatChannel.bind(EVENTS.SUBSCRIPTION_ERROR, er =>
    console.log("subscription error", er)
  );
  chatChannel.bind(EVENTS.CHAT, onChat);

  return () => {
    pusher.disconnect();
  };
}
