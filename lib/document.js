export function isScrolledToBottom() {
  return (
    Math.abs(doc().scrollHeight - doc().scrollTop - doc().offsetHeight) <= 3
  );
}

export function scrollToBottom() {
  doc().scroll(0, doc().scrollHeight);
}

function doc() {
  return document.documentElement;
}
