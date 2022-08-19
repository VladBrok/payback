import { EVENTS, CHANNELS } from "lib/chat/constants";
import { PaybackError } from "lib/errors";
import Pusher from "pusher-js/with-encryption";

export function connect(chats, userId, onMessage, onChat) {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "api/auth/chat",
  });

  chats?.forEach(c => {
    const messageChannel = pusher.subscribe(
      `${CHANNELS.ENCRYPTED_BASE}${c.id}`
    );
    messageChannel.bind(EVENTS.SUBSCRIPTION_ERROR, throwSubscriptionError);
    messageChannel.bind(EVENTS.MESSAGE, onMessage);
  });

  const chatChannelName = `${CHANNELS.ENCRYPTED_BASE}${userId}`;
  const chatChannel = pusher.subscribe(chatChannelName);
  chatChannel.bind(EVENTS.SUBSCRIPTION_ERROR, throwSubscriptionError);
  chatChannel.bind(EVENTS.CHAT, onChat);

  return () => {
    pusher.disconnect();
  };
}

function throwSubscriptionError(err) {
  throw new PaybackError("Cannot subscribe to chat updates", err);
}
