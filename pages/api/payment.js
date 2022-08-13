import Razorpay from "razorpay";
import { nanoid } from "nanoid";

const CENTS_IN_DOLLAR = 100;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const amount = 499;
    const currency = "USD"; // todo: move to sharedConstants
    const options = {
      amount: (amount * CENTS_IN_DOLLAR).toString(),
      currency,
      receipt: nanoid(),
      payment_capture: 1,
    };

    try {
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
