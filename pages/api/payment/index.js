import Razorpay from "razorpay";
import { nanoid } from "nanoid";
import { CURRENCY } from "lib/sharedConstants";
import { formatPriceForRazorpay } from "lib/price";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const productId = +req.query.productId;
      const price = (
        await prisma.product.findFirst({ where: { id: productId } })
      )?.price;
      if (price == null) {
        throw new Error(`Product with id ${productId} not found.`);
      }

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      const options = {
        amount: formatPriceForRazorpay(price),
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
