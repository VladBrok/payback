import { EVENTS, CHANNELS } from "lib/chat/constants";
import { PaybackError } from "lib/errors";
import Pusher from "pusher-js/with-encryption";

let pusher;
if (!window.pusher) {
  window.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "/api/auth/chat",
  });
}
pusher = window.pusher;

export function connectToMessages(chatId, onMessage) {
  const channelName = `${CHANNELS.ENCRYPTED_BASE}${chatId}`;
  const messageChannel = pusher.subscribe(channelName);
  messageChannel.bind(EVENTS.SUBSCRIPTION_ERROR, throwSubscriptionError);
  messageChannel.bind(EVENTS.MESSAGE, onMessage);

  return () => {
    messageChannel.unbind();
    pusher.unsubscribe(channelName);
  };
}

export function connectToChats(userId, onChat) {
  const channelName = `${CHANNELS.ENCRYPTED_BASE}${userId}`;
  const chatChannel = pusher.subscribe(channelName);
  chatChannel.bind(EVENTS.SUBSCRIPTION_ERROR, throwSubscriptionError);
  chatChannel.bind(EVENTS.CHAT, onChat);

  return () => {
    chatChannel.unbind();
    pusher.unsubscribe(channelName);
  };
}

// fixme: it will throw outside of promise
function throwSubscriptionError(err) {
  console.log(err);
  throw new PaybackError("Cannot subscribe to chat updates", err);
}
