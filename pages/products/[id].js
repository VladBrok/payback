import Product from "../../components/Product";
import Button from "../../components/Button";
import Subpage from "../../components/Subpage";
import Category from "../../components/Category";
import products from "../../data/products.json";
import categories from "../../data/categories.json";
import { byId } from "../../lib/productFinders";
import { byName } from "../../lib/categoryFinders";
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
    <Subpage
      title={
        <Category
          flexDirection="row"
          imageSizeIncrease="0px"
          name={product.category}
          imageUrl={categories.find(byName(product.category)).imageUrl}
        />
      }
    >
      <Product
        price={product.price}
        image={product.image}
        flexDirectionWhenExpanded="row"
      >
        <h2>{product.title}</h2>
        <Button onClick={buy}>Buy</Button>
      </Product>
    </Subpage>
  );
}
