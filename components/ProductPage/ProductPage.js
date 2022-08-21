import styles from "./ProductPage.module.scss";
import utilStyles from "styles/utils.module.scss";
import Product from "components/Product";
import Subpage from "components/Subpage";
import Category from "components/Category";
import Section from "components/Section";
import User from "components/User";
import ProductList from "components/ProductList";
import Rating from "components/Rating";
import ReviewModal from "components/ReviewModal";
import AuthButton from "components/AuthButton";
import TestPaymentNotice from "components/TestPaymentNotice";
import withDataFetching from "components/withDataFetching";
import { bySimilar } from "lib/db/productFilters";
import { makeProductPayment } from "lib/payment/client";
import { get } from "lib/api/client";
import { FcSearch } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/react";

function ProductPage({
  fetchedData: product,
  customState: modalIsOpen,
  setCustomState: setModalIsOpen,
}) {
  const { data } = useSession();
  const userId = data?.user?.id;

  function handleModalClose() {
    setModalIsOpen(false);
  }

  function handleBuyClick() {
    makeProductPayment(product, () => setModalIsOpen(true));
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
          imageSize="14rem"
          flexDirectionWhenExpanded="row"
        >
          <h2>{product.title}</h2>
          {!product.isSold && (
            <>
              <TestPaymentNotice />
              <AuthButton
                type="button"
                className={utilStyles["button-primary"]}
                onClick={handleBuyClick}
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
          <ProductList filter={bySimilar(product)} />
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
