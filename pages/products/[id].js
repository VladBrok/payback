import styles from "./[id].module.scss";
import utilStyles from "styles/utils.module.scss";
import Product from "components/Product";
import Subpage from "components/Subpage";
import Category from "components/Category";
import Section from "components/Section";
import User from "components/User";
import ProductList from "components/ProductList";
import Router from "components/Router";
import Rating from "components/Rating";
import products from "data/products.json";
import users from "data/users.json";
import { byId as byProductId } from "lib/productFinders";
import { byId as byUserId } from "lib/userFinders";
import { bySimilar } from "lib/productFilters";
import { FcSearch } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";

// todo: move it (and other subpages) to components folder
// so that it's easier to find them

export default function ProductPage() {
  function buy() {
    console.log("buy");
  }

  return (
    <Router>
      {({ id }) => {
        const product = products.find(byProductId(id));
        const user = users.find(byUserId(product.userId));

        return (
          <>
            <Head>
              <title>{product.title}</title>
              <meta name="description" content={product.description} />
            </Head>

            <Subpage title={<Category name={product.category} />}>
              {product.isSold && <div className={styles.sold}>Sold</div>}
              <Product
                price={product.price}
                image={product.image}
                imageSize="14rem"
                flexDirectionWhenExpanded="row"
              >
                <h2>{product.title}</h2>
                {!product.isSold && (
                  <button
                    type="button"
                    className={utilStyles["button-primary"]}
                    onClick={buy}
                  >
                    Buy
                  </button>
                )}
              </Product>

              <Section title="Description">
                <p>{product.description}</p>
              </Section>

              <Section title="Seller">
                <Link href={`/users/${user.id}`}>
                  <a>
                    <User
                      name={user.login?.username ?? user.name} // fixme: use user.name
                      imageUrl={user.picture.large}
                    >
                      <Rating
                        value={user.rating}
                        reviewCount={user.reviewCount}
                      />
                    </User>
                  </a>
                </Link>
              </Section>

              <Section title="Similar products" Icon={FcSearch}>
                <ProductList filter={bySimilar(product)} />
              </Section>
            </Subpage>
          </>
        );
      }}
    </Router>
  );
}
