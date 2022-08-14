import { post } from "lib/api";

export async function makePayment(product, onSuccess) {
  const res = await initializeRazorpay();
  if (!res) {
    console.log("Razorpay SDK Failed to load");
    return;
  }

  const data = await (
    await fetch(`/api/payment?productId=${product.id}`, { method: "POST" })
  ).json();
  const options = {
    name: "Payback",
    currency: data.currency,
    amount: data.amount,
    order_id: data.id,
    description: `Buy ${product.title}`,
    image: product.image,
    handler(res) {
      post(`sell?id=${product.id}`, res).then(res => {
        if (!res.ok) {
          console.log(res.statusText);
          return;
        }

        onSuccess();
      });
    },
    prefill: {
      name: "Vlad Brok",
      email: "example@gmail.com",
      contact: "9999999999",
    },
  };

  new window.Razorpay(options).open();
}

const RAZOR_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

function initializeRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = RAZOR_SCRIPT;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}
