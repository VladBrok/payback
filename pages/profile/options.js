import styles from "./options.module.scss";
import utilStyles from "styles/utils.module.scss";
import ProfilePage from "components/ProfilePage";
import { signOut } from "next-auth/react";

function ProfileOptionsPage() {
  async function handleSignOut() {
    await signOut({ redirect: false });
  }

  return (
    <ProfilePage>
      <div className={styles.container}>
        <button
          type="button"
          className={utilStyles["button-primary-danger"]}
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </ProfilePage>
  );
}

ProfileOptionsPage.auth = true;
export default ProfileOptionsPage;
