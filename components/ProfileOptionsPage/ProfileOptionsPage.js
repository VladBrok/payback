import styles from "./ProfileOptionsPage.module.scss";
import utilStyles from "styles/utils.module.scss";
import Profile from "components/Profile";
import { signOut } from "next-auth/react";

function ProfileOptionsPage({ sessionUser }) {
  async function handleSignOut() {
    await signOut({ redirect: false });
  }

  return (
    <Profile sessionUser={sessionUser}>
      <div className={styles.container}>
        {/* todo: disable when clicked ? */}
        <button
          type="button"
          className={utilStyles["button-primary-danger"]}
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </Profile>
  );
}

ProfileOptionsPage.auth = true;
export default ProfileOptionsPage;
