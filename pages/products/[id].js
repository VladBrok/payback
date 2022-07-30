import Product from "../../components/Product";
import CtaButton from "../../components/CtaButton";
import Subpage from "../../components/Subpage";
import Category from "../../components/Category";
import Section from "../../components/Section";
import User from "../../components/User";
import ProductList from "../../components/ProductList";
import Router from "../../components/Router";
import products from "../../data/products.json";
import users from "../../data/users.json";
import { byId as byProductId } from "../../lib/productFinders";
import { byId as byUserId } from "../../lib/userFinders";
import { bySimilar } from "../../lib/productFilters";
import { FcSearch } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";

export default function ProductPage() {
  function buy() {
    console.log("buy");
  }

  return (
    <Router>
      {({ id }) => {
        // fixme: use useMemo or useCallback ?
        const product = products.find(byProductId(id));
        const user = users.find(byUserId(product.userId));

        return (
          <>
            <Head>
              <title>{product.title}</title>
              <meta name="description" content={product.description} />
            </Head>
            <Subpage title={<Category name={product.category} />}>
              <Product
                price={product.price}
                image={product.image}
                flexDirectionWhenExpanded="row"
              >
                <h2>{product.title}</h2>
                <CtaButton onClick={buy}>Buy</CtaButton>
              </Product>

              <Section title="Description">
                <p>{product.description}</p>
              </Section>

              <Section title="Seller">
                <Link href={`/users/${user.login.username}`}>
                  <a>
                    <User
                      name={user.login.username}
                      imageUrl={user.picture.large}
                      rating={user.rating}
                      reviewCount={user.reviewCount}
                      reviewWrapper={children => children}
                    />
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
