import utilStyles from "styles/utils.module.scss";
import ProductList from "components/ProductList";
import Profile from "components/Profile";
import Empty from "components/Empty";
import { byUserId } from "lib/db/productFilters";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";

function ProfileProductsPage({ sessionUser }) {
  return (
    <Profile sessionUser={sessionUser}>
      {user => (
        <ProductList
          filter={byUserId(user.id)}
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
      )}
    </Profile>
  );
}

ProfileProductsPage.auth = true;
export default ProfileProductsPage;
