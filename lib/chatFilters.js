export function byUserId(id) {
  return c => (c.users.length ? c.users.find(u => u == id) : true);
}
