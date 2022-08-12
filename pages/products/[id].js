import styles from "./[id].module.scss";
import utilStyles from "styles/utils.module.scss";
import Product from "components/Product";
import Subpage from "components/Subpage";
import Category from "components/Category";
import Section from "components/Section";
import User from "components/User";
import ProductList from "components/ProductList";
import Rating from "components/Rating";
import Loading from "components/Loading";
import { bySimilar } from "lib/productFilters";
import { FcSearch } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// todo: move it (and other subpages) to components folder
// so that it's easier to find them
export default function ProductPage() {
  const [product, setProduct] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    fetch(`/api/product?id=${id}`).then(async res =>
      setProduct(await res.json())
    );
  }, [router.isReady, id]);

  function buy() {
    console.log("buy");
  }

  // fixme: use getServerSideProps ?
  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>

      <Subpage
        title={
          <Category
            name={product.category.name}
            image={product.category.image}
          />
        }
      >
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

        {product.description && (
          <Section title="Description">
            <p>{product.description}</p>
          </Section>
        )}

        <Section title="Seller">
          <Link href={`/users/${product.user.id}`}>
            <a>
              <User name={product.user.name} imageUrl={product.user.image}>
                <Rating
                  value={product.user.rating}
                  reviewCount={product.user.reviewCount}
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
}
