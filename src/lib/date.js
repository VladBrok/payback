import { formatRelative } from "date-fns";
import { default as formatDistanceToNowFns } from "date-fns/formatDistanceToNow";

export function formatRelativeToNow(dateStr) {
  return formatRelative(new Date(dateStr), new Date());
}

export function formatDistanceToNow(dateStr) {
  return `${formatDistanceToNowFns(new Date(dateStr))} ago`;
}

export function getLastTwoDigitsOfNextYear() {
  return (new Date().getFullYear() + 1) % 100;
}
