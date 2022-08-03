import utilStyles from "styles/utils.module.scss";
import ProductList from "components/ProductList";
import ProfilePage from "components/ProfilePage";
import Empty from "components/Empty";
import { byUserId } from "lib/productFilters";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";

function ProfileProductsPage() {
  return (
    <ProfilePage>
      {user => (
        <ProductList
          filter={byUserId(user.email)}
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
    </ProfilePage>
  );
}

ProfileProductsPage.auth = true;
export default ProfileProductsPage;
