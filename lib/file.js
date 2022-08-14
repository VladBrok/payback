import { BYTES_IN_MEGABYTE } from "lib/sharedConstants";

export function toBase64(file) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

export function toMegabytes(bytes) {
  return bytes / BYTES_IN_MEGABYTE;
}
