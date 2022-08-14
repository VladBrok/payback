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
import ReviewModal from "components/ReviewModal";
import { bySimilar } from "lib/productFilters";
import { put } from "lib/api";
import { FcSearch } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const RAZOR_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

// fixme: refactor
function initializeRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = RAZOR_SCRIPT;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

// todo: move it (and other subpages) to components folder
// so that it's easier to find them
export default function ProductPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [product, setProduct] = useState();
  const router = useRouter();
  const {
    data: {
      user: { id: userId },
    },
  } = useSession();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    fetch(`/api/product?id=${id}`).then(async res =>
      setProduct(await res.json())
    );
  }, [router.isReady, id, modalIsOpen]);

  function handleModalClose() {
    setModalIsOpen(false);
  }

  async function makePayment() {
    const res = await initializeRazorpay();

    if (!res) {
      console.log("Razorpay SDK Failed to load");
      return;
    }

    // todo: use post from lib
    const data = await (
      await fetch(`/api/payment?productId=${product.id}`, { method: "POST" })
    ).json();
    const options = {
      name: "Payback",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: `Buy ${product.title}`,
      image: product.image,
      handler() {
        put(`product?id=${product.id}`, { isSold: true }).then(() =>
          setModalIsOpen(true)
        );
      },
      prefill: {
        name: "Vlad Brok",
        email: "example@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
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
          {/* fixme: make TestModeNotice component. 
              test card no.: 5267 3181 8797 5449 */}
          {!product.isSold && (
            <button
              type="button"
              className={utilStyles["button-primary"]}
              onClick={makePayment}
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
