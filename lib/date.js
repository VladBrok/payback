import { formatRelative } from "date-fns";

export function formatRelativeToNow(dateStr) {
  return formatRelative(new Date(dateStr), new Date());
}
