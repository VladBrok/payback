import crypto from "crypto";

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
