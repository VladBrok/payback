import { withServerProps } from "lib/serverSide";
import prisma from "lib/db/prisma";
import { enrichUser } from "lib/db/user";
import { getProducts } from "lib/db/product";
import { bySimilar } from "lib/db/product/filters";

export { default } from "components/ProductPage";

export async function getServerSideProps(context) {
  const productId = +context.query.id;

  return withServerProps(
    () => ({
      id: productId,
      data: () => getProduct(),
      products: ({ data: product }) => getProducts(bySimilar(product)),
      productFilter: ({ data: product }) => bySimilar(product),
    }),
    context
  );

  // fixme: dup with api
  async function getProduct() {
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { category: true, user: true },
    });

    if (product) {
      await enrichUser(product.user.id, product.user);
    }

    return product;
  }
}
