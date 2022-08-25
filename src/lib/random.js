export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomDate(maxHoursOffset) {
  const now = new Date();
  now.setHours(now.getHours() - randomNumber(1, maxHoursOffset));
  return now;
}
