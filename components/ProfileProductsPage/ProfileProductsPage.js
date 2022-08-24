import utilStyles from "styles/utils.module.scss";
import ProductList from "components/ProductList";
import Profile from "components/Profile";
import Empty from "components/Empty";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";

function ProfileProductsPage({ user, products, productFilter }) {
  return (
    <Profile data={user} userId={user.id}>
      <ProductList
        filter={productFilter}
        data={products}
        fallback={
          <Empty
            title="No products"
            Icon={FcInTransit}
            hint="time to add some!"
          >
            <Link href="/sell">
              <a className={utilStyles["button-primary"]}>Add product</a>
            </Link>
          </Empty>
        }
      />
    </Profile>
  );
}

ProfileProductsPage.auth = true;
export default ProfileProductsPage;
