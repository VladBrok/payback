import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthButton({ onClick, children, ...props }) {
  const session = useSession();
  const router = useRouter();

  function handleClick() {
    if (session.status !== "authenticated") {
      router.push("/profile/signIn");
    } else {
      onClick();
    }
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
