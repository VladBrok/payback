export function debounce(fn, delay = 200, immediate = false) {
  let timeout;

  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };

    if (immediate && !timeout) {
      fnCall();
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fnCall();
    }, delay);
  };
}
