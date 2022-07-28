import styles from "./[id].module.scss";
import Product from "../../components/Product";
import Button from "../../components/Button";
import products from "../../data/products.json";
import { byId } from "../../lib/productFinders";
import { useRouter } from "next/router";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  if (id == undefined) {
    return;
  }

  function buy() {
    console.log("buy");
  }

  const product = products.find(byId(id));

  return (
    <main className={styles.container}>
      <Product
        price={product.price}
        image={product.image}
        flexDirectionWhenExpanded="row"
      >
        <h2>{product.title}</h2>
        <Button onClick={buy}>Buy</Button>
      </Product>
    </main>
  );
}
