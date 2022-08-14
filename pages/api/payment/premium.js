import { createOrder } from "lib/payment/server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const order = await createOrder(process.env.PREMIUM_COST);
      res.status(200).json(order);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
