import { fetchServerSide } from "lib/serverSide";
import prisma from "lib/db/prisma";
import { enrichUser } from "lib/db/user";
import { getProducts } from "lib/db/product";
import { bySimilar } from "lib/db/product/filters";

export { default } from "components/ProductPage";

export async function getServerSideProps(context) {
  const productId = +context.query.id;

  const result = await fetchServerSide(getProduct);
  if (result.notFound) {
    return {
      notFound: true,
    };
  }
  const product = result.data;

  return {
    props: {
      id: productId,
      data: product,
      products: (await fetchServerSide(() => getProducts(bySimilar(product))))
        .data,
      productFilter: bySimilar(product),
    },
  };

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
