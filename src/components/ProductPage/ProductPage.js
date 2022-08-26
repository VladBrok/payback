import styles from "./ProductPage.module.scss";
import utilStyles from "styles/utils.module.scss";
import Product from "components/Product";
import Subpage from "components/Subpage";
import CategoryLink from "components/CategoryLink";
import Section from "components/Section";
import User from "components/User";
import ProductList from "components/ProductList";
import Rating from "components/Rating";
import ReviewModal from "components/ReviewModal";
import AuthButton from "components/AuthButton";
import TestPaymentNotice from "components/TestPaymentNotice";
import withDataFetching from "components/withDataFetching";
import { bySimilar } from "lib/db/product/filters";
import { makeProductPayment } from "lib/payment/client";
import { get, post } from "lib/api/client";
import useSessionUser from "hooks/useSessionUser";
import { FcSearch } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

function ProductPage({
  products,
  fetchedData: product,
  customState: modalIsOpen,
  setCustomState: setModalIsOpen,
}) {
  const [isBuying, setIsBuying] = useState(false);
  const sessionUser = useSessionUser();
  const userId = sessionUser?.id;

  function handleModalClose() {
    setModalIsOpen(false);
  }

  function handleBuyClick() {
    setIsBuying(true);
    makeProductPayment(product, handlePaymentSuccess).finally(() => {
      setIsBuying(false);
    });
  }

  function handlePaymentSuccess(res) {
    setIsBuying(true);
    post(`/api/sell?productId=${product.id}`, res)
      .then(() => setModalIsOpen(true))
      .finally(() => {
        setIsBuying(false);
      });
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>

      <Subpage
        title={
          <CategoryLink
            id={product.category.id}
            name={product.category.name}
            image={product.category.image}
            priority
          />
        }
      >
        <ReviewModal
          buyerId={userId}
          productId={product.id}
          isOpen={modalIsOpen}
          close={handleModalClose}
        />

        {product.isSold && <div className={styles.sold}>Sold</div>}
        <Product
          price={product.price}
          image={product.image}
          priority
          imageSize="14rem"
          flexDirectionWhenExpanded="row"
        >
          <h1>{product.title}</h1>
          {!product.isSold && (
            <>
              <TestPaymentNotice />
              <AuthButton
                type="button"
                className={utilStyles["button-primary"]}
                onClick={handleBuyClick}
                disabled={isBuying}
              >
                Buy
              </AuthButton>
            </>
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
          <ProductList filter={bySimilar(product)} data={products} />
        </Section>
      </Subpage>
    </>
  );
}

export default withDataFetching(
  ProductPage,
  ({ id }) => get(`/api/product?id=${id}`),
  props => ({ id: props.id }),
  false,
  false
);
