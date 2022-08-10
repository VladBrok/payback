import { useRouter } from "next/router";

export default function SellPage() {
  const pathname = useRouter().pathname;
  console.log(pathname);

  return <></>;
}
