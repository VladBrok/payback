import { EVENTS, CHANNELS } from "lib/chat/constants";
import { PaybackError } from "lib/errors";
import Pusher from "pusher-js/with-encryption";

let pusher;
if (!window.pusher) {
  window.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "api/auth/chat",
  });
}
pusher = window.pusher;

function makeMessageChannelName(chatId) {
  return `${CHANNELS.ENCRYPTED_BASE}${chatId}`;
}

export function connect(chats, userId, onMessage, onChat) {
  const messageChannels = Array(chats.length).fill(0);
  chats?.forEach((c, i) => {
    const messageChannel = pusher.subscribe(makeMessageChannelName(c.id));
    messageChannel.bind(EVENTS.SUBSCRIPTION_ERROR, throwSubscriptionError);
    messageChannel.bind(EVENTS.MESSAGE, onMessage);
    messageChannels[i] = messageChannel;
  });

  const chatChannelName = `${CHANNELS.ENCRYPTED_BASE}${userId}`;
  const chatChannel = pusher.subscribe(chatChannelName);
  chatChannel.bind(EVENTS.SUBSCRIPTION_ERROR, throwSubscriptionError);
  chatChannel.bind(EVENTS.CHAT, onChat);

  return () => {
    chatChannel.unbind();
    pusher.unsubscribe(chatChannelName);

    chats?.forEach((c, i) => {
      messageChannels[i].unbind();
      pusher.unsubscribe(makeMessageChannelName(c.id));
    });
  };
}

// fixme: it will throw outside of promise
function throwSubscriptionError(err) {
  throw new PaybackError("Cannot subscribe to chat updates", err);
}
