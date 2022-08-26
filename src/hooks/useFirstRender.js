import { useRef } from "react";

export default function useFirstRender() {
  const ref = useRef(true);
  const isFirst = ref.current;
  ref.current = false;
  return isFirst;
}
