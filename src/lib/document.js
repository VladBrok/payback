export function isScrolledToBottom() {
  return (
    Math.abs(doc().scrollHeight - doc().scrollTop - doc().offsetHeight) <= 3
  );
}

export function scrollToBottom() {
  console.log("scrolling...");
  doc().scroll(0, doc().scrollHeight);
}

export function checkIfInsideBounds(element, top, bottom, callback) {
  if (!element) {
    return;
  }

  const rect = element.getBoundingClientRect();
  if (rect.top < bottom && rect.bottom > top) {
    callback();
  }
}

function doc() {
  return document.documentElement;
}
