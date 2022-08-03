import utilStyles from "styles/utils.module.scss";
import { signOut } from "next-auth/react";

function ProfilePage() {
  async function handleSingOut() {
    await signOut({ redirect: false });
  }

  return (
    <button
      type="button"
      className={utilStyles["button-primary-danger"]}
      onClick={handleSingOut}
    >
      Sign out
    </button>
  );
}

ProfilePage.auth = true;
export default ProfilePage;
