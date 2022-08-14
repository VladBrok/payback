import { createOrder } from "lib/payment/server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const productId = +req.query.id;
      const price = (
        await prisma.product.findFirst({ where: { id: productId } })
      )?.price;
      if (price == null) {
        throw new Error(`Product with id ${productId} not found.`);
      }

      const order = await createOrder(price);
      res.status(200).json(order);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
