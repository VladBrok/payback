import Subpage from "components/Subpage";
import CategorySearch from "components/CategorySearch";
import { useRouter } from "next/router";

export default function SellPage() {
  const pathname = useRouter().pathname;
  console.log(pathname);

  return (
    <>
      {pathname.endsWith("/sell") && (
        <Subpage title="Select category">
          <CategorySearch searchBarLabel="Find category" />
        </Subpage>
      )}
    </>
  );
}
