import CtaButton from "components/CtaButton";
import { signOut } from "next-auth/react";

function ProfilePage() {
  async function handleSingOut() {
    await signOut({ redirect: false });
  }

  return <CtaButton onClick={handleSingOut}>Sign out</CtaButton>; // fixme: use same button as in signIn ?
}

ProfilePage.auth = true;
export default ProfilePage;
