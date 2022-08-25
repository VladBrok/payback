const DELIM = "-";

export function getUserIdsFromChatId(id) {
  return id.split(DELIM);
}

export function makeChatId(userIds) {
  return encodeURIComponent(userIds.sort((a, b) => +a - +b).join(DELIM));
}
