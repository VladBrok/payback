export function toBase64(file) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}
