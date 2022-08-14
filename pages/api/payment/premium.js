import { razorpay } from "lib/payment/server";
import { CURRENCY } from "lib/sharedConstants";
import { formatMoneyForRazorpay } from "lib/money";
import { nanoid } from "nanoid";

// fixme: dup with payment/product.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const options = {
        amount: formatMoneyForRazorpay(process.env.PREMIUM_COST),
        currency: CURRENCY,
        receipt: nanoid(),
        payment_capture: 1,
      };

      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
