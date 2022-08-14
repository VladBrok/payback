import crypto from "crypto";
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

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
