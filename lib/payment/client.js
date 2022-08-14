import { post } from "lib/api";

export async function makePremiumPayment(onSuccess) {
  await makePayment({
    endpoint: "/api/payment/premium",
    description: "Buy premium status",
    handler(res) {
      onSuccess(res);
    },
  });
}

export async function makeProductPayment(product, onSuccess) {
  await makePayment({
    endpoint: `/api/payment/product?id=${product.id}`,
    description: `Buy ${product.title}`,
    image: product.image,
    handler(res) {
      post(`sell?productId=${product.id}`, res).then(res => {
        if (!res.ok) {
          console.log(res.statusText);
          return;
        }

        onSuccess();
      });
    },
  });
}

async function makePayment({ endpoint, handler, description, image }) {
  const initialized = await initializeRazorpay();
  if (!initialized) {
    console.log("Razorpay SDK Failed to load");
    return;
  }

  const paymentData = await (await fetch(endpoint, { method: "POST" })).json();
  const options = {
    name: "Payback",
    currency: paymentData.currency,
    amount: paymentData.amount,
    order_id: paymentData.id,
    description,
    image,
    handler,
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
