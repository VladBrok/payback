import { get, post } from "lib/api/client";
import { getLastTwoDigitsOfNextYear } from "lib/date";
import { PaybackError } from "lib/errors";

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
      post(`/api/sell?productId=${product.id}`, res).then(onSuccess);
    },
  });
}

async function makePayment({ endpoint, handler, description, image }) {
  const initialized = await initializeRazorpay();
  if (!initialized) {
    throw new PaybackError("Payment gateway is failed to load");
  }

  const paymentData = await get(endpoint);
  if (!paymentData) {
    throw new PaybackError("Cannot get payment data");
  }

  const options = {
    name: "Payback",
    currency: paymentData.currency,
    amount: paymentData.amount,
    order_id: paymentData.id,
    description,
    image,
    handler,
    prefill: {
      method: "card",
      name: "Vlad Brok",
      email: "example@gmail.com",
      contact: "9999999999",
      "card[expiry]": `12/${getLastTwoDigitsOfNextYear()}`,
      "card[cvv]": "111",
      "card[number]": "5267 3181 8797 5449",
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
