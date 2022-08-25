import { getUserIdsFromChatId } from "lib/chat/chatId";
import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  encryptionMasterKeyBase64: process.env.PUSHER_ENCRYPTION_KEY,
  useTLS: true,
});

export function canAccessChat(userId, chatId) {
  const userIds = getUserIdsFromChatId(chatId);
  return userIds.some(id => id == userId);
}
