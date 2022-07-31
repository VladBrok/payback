import { formatRelative } from "date-fns";

export function formatRelativeToNow(dateStr) {
  console.log(dateStr);
  return formatRelative(new Date(dateStr), new Date());
}
