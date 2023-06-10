import { default as formatDistanceToNowFns } from "date-fns/formatDistanceToNow";

export function formatRelativeToNow(dateStr) {
  const date = new Date(dateStr);
  const time = Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
  const diff = differenceInCalendarDays(date, new Date());

  let result = "";
  if (diff === 0) {
    result = `today at ${time}`;
  } else if (diff === -1) {
    result = `yesterday at ${time}`;
  } else if (diff < -1 && diff >= -6) {
    const weekday = date.toLocaleString("en-US", { weekday: "long" });
    result = `last ${weekday} at ${time}`;
  } else {
    result = `${Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
    }).format(date)} at ${time}`;
  }

  return result;
}

export function formatDistanceToNow(dateStr) {
  return `${formatDistanceToNowFns(new Date(dateStr))} ago`;
}

export function getLastTwoDigitsOfNextYear() {
  return (new Date().getFullYear() + 1) % 100;
}

export function differenceInCalendarDays(later, earlier) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utcEarlier = Date.UTC(
    earlier.getFullYear(),
    earlier.getMonth(),
    earlier.getDate()
  );
  const utcLater = Date.UTC(
    later.getFullYear(),
    later.getMonth(),
    later.getDate()
  );

  return Math.floor((utcLater - utcEarlier) / MS_PER_DAY);
}
