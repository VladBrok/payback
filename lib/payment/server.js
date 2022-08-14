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

export function isSignatureValid({
  razorpay_signature,
  razorpay_order_id,
  razorpay_payment_id,
}) {
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  return generatedSignature == razorpay_signature;
}

export async function isOrderStatusValid({ razorpay_order_id }) {
  const order = await razorpay.orders.fetch(razorpay_order_id);
  return order.status === "paid" && !order.notes.isProcessed;
}

export async function isPaymentStatusValid({ razorpay_order_id }) {
  const payments = await razorpay.orders.fetchPayments(razorpay_order_id);
  return payments.items.every(p => p.status === "captured");
}

export async function processOrder({ razorpay_order_id }) {
  return await razorpay.orders.edit(razorpay_order_id, {
    notes: { isProcessed: true },
  });
}

export async function createOrder(price) {
  const options = {
    amount: formatMoneyForRazorpay(price),
    currency: CURRENCY,
    receipt: nanoid(),
    payment_capture: 1,
  };

  return await razorpay.orders.create(options);
}
