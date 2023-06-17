let prevFocused = null;
let focused = null;

if (typeof document !== "undefined") {
  document.addEventListener("focusin", e => {
    prevFocused = focused;
    focused = e.target;
  });
}

export function getPreviouslyFocused() {
  return prevFocused;
}
