import { get } from "lib/api/client";
import { getLastTwoDigitsOfNextYear } from "lib/date";
import { PaybackError } from "lib/errors";

export async function makePremiumPayment(onSuccess) {
  await makePayment({
    endpoint: "/api/payment/premium",
    description: "Buy premium status",
    onSuccess,
  }).catch(err => {
    throw new PaybackError(
      "Failed to buy a premium status. Please try again later",
      err
    );
  });
}

export async function makeProductPayment(product, onSuccess) {
  await makePayment({
    endpoint: `/api/payment/product?id=${product.id}`,
    description: `Buy ${product.title}`,
    image: product.image,
    onSuccess,
  }).catch(err => {
    throw new PaybackError(
      "Failed to buy a product. Please try again later",
      err
    );
  });
}

async function makePayment({ endpoint, description, image, onSuccess }) {
  const initialized = await initializeRazorpay();
  if (!initialized) {
    throw new PaybackError("A payment gateway is failed to load");
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
    handler(res) {
      onSuccess(res);
    },
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
