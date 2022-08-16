export function isScrolledToBottom() {
  return (
    Math.abs(doc().scrollHeight - doc().scrollTop - doc().offsetHeight) <= 3
  );
}

export function scrollToBottom() {
  doc().scroll(0, doc().scrollHeight);
}

export function isInsideVerticalBounds(element, top, bottom) {
  const rect = element.getBoundingClientRect();
  return rect.top < bottom && rect.bottom > top;
}

function doc() {
  return document.documentElement;
}
