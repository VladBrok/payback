import { useContext } from "react";
import { Context } from "context/SessionUser";

export default function useSessionUser() {
  const user = useContext(Context);
  return user;
}
