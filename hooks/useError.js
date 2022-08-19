import { Context } from "context/ErrorContext";
import { useContext } from "react";

export default function useError() {
  return useContext(Context);
}
