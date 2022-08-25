import crypto from "crypto";
import Razorpay from "razorpay";
import { CURRENCY } from "lib/sharedConstants";
import { formatMoneyForRazorpay } from "lib/money";
import { nanoid } from "nanoid";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
export { razorpay };

export async function processOrder(paymentData) {
  await ensurePaymentDataValid(paymentData);

  const orderId = paymentData.razorpay_order_id;
  return await razorpay.orders.edit(orderId, {
    notes: { isProcessed: true },
  });
}

async function ensurePaymentDataValid(paymentData) {
  if (!paymentData) {
    throw new Error("Payment data not provided");
  }
  if (!isSignatureValid(paymentData)) {
    throw new Error("Invalid signature");
  }
  if (!(await isPaymentStatusValid(paymentData))) {
    throw new Error("Invalid payment status");
  }
  if (!(await isOrderStatusValid(paymentData))) {
    throw new Error("Invalid order status");
  }
}

function isSignatureValid({
  razorpay_signature,
  razorpay_order_id,
  razorpay_payment_id,
}) {
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  return generatedSignature == razorpay_signature;
}

async function isOrderStatusValid({ razorpay_order_id }) {
  const order = await razorpay.orders.fetch(razorpay_order_id);
  return order.status === "paid" && !order.notes.isProcessed;
}

async function isPaymentStatusValid({ razorpay_order_id }) {
  const payments = await razorpay.orders.fetchPayments(razorpay_order_id);
  return payments.items.every(p => p.status === "captured");
}

export async function createOrder(price) {
  if (price < process.env.MIN_PRICE || price > process.env.MAX_PRICE) {
    throw new Error(
      `Price value is out of range: ${price}. Min value is ${process.env.MIN_PRICE}, and max is ${process.env.MAX_PRICE}`
    );
  }

  const options = {
    amount: formatMoneyForRazorpay(price),
    currency: CURRENCY,
    receipt: nanoid(),
    payment_capture: 1,
  };

  return await razorpay.orders.create(options);
}
