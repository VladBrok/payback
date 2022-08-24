import Header from "components/Header";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "next/head";

export default function HomePage({ products, categories, productFilter }) {
  return (
    <>
      <Head>
        <title>Payback — fully-featured e-commerce store</title>
      </Head>

      <Header />
      <Main
        products={products}
        categories={categories}
        productFilter={productFilter}
      />
      <Footer />
    </>
  );
}
