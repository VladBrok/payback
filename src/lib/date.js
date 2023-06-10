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
  const now = new Date();
  const date = new Date(dateStr);
  const nowUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
  const dateUTC = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  const diffMs = nowUTC - dateUTC;
  const diffS = diffMs / 1000;

  let result = "";
  if (diffS < 30) {
    result = "less than a minute";
  } else if (diffS < 90) {
    result = "1 minute";
  } else if (diffS < 2670) {
    result = `${Math.floor(diffS / 60)} minutes`;
  } else if (diffS < 5370) {
    result = "about 1 hour";
  } else if (diffS < 86370) {
    result = `about ${Math.floor(diffS / 60 / 60)} hours`;
  } else if (diffS < 151170) {
    result = "1 day";
  } else if (diffS < 2591970) {
    result = `${Math.floor(diffS / 60 / 60 / 24)} days`;
  } else if (diffS < 3887970) {
    result = "about 1 month";
  } else if (diffS < 5183970) {
    result = "about 2 months";
  } else if (diffS < 31622370) {
    result = `${Math.floor(diffS / 60 / 60 / 24 / 30)} months`;
  } else {
    result = "over 1 year";
  }

  return `${result} ago`;
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
