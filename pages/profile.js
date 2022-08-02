import CtaButton from "components/CtaButton";
import { signOut } from "next-auth/react";

function ProfilePage() {
  return <CtaButton onClick={signOut}>Sign out</CtaButton>;
}

ProfilePage.auth = true;
export default ProfilePage;
