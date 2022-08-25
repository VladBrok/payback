import useSessionUser from "hooks/useSessionUser";
import { useRouter } from "next/router";

export default function AuthButton({ onClick, children, ...props }) {
  const sessionUser = useSessionUser();
  const router = useRouter();

  function handleClick() {
    if (!sessionUser) {
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
