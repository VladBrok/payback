import Product from "../../components/Product";
import Button from "../../components/Button";
import Subpage from "../../components/Subpage";
import Category from "../../components/Category";
import Section from "../../components/Section";
import User from "../../components/User";
import products from "../../data/products.json";
import categories from "../../data/categories.json";
import users from "../../data/users.json";
import { byId as byProductId } from "../../lib/productFinders";
import { byId as byUserId } from "../../lib/userFinders";
import { byName } from "../../lib/categoryFinders";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  if (id == undefined) {
    return;
  }

  function buy() {
    console.log("buy");
  }

  const product = products.find(byProductId(id));
  const user = users.find(byUserId(product.userId));

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

      <Section title="Description">
        <p>{product.description}</p>
      </Section>

      <Section title="Seller">
        <Link href={`/users/${user.login.username}`}>
          <a>
            <User name={user.login.username} imageUrl={user.picture.large} />
          </a>
        </Link>
      </Section>
    </Subpage>
  );
}
