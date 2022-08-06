export function makeChatId(userIds) {
  return encodeURIComponent(userIds.sort((a, b) => +a - +b).join("-"));
}
