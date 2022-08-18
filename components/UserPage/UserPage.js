import utilStyles from "styles/utils.module.scss";
import Subpage from "components/Subpage";
import User from "components/User";
import ProductList from "components/ProductList";
import Empty from "components/Empty";
import Rating from "components/Rating";
import Loading from "components/Loading";
import ReviewLink from "components/ReviewLink";
import { byUserId } from "lib/db/productFilters";
import { post } from "lib/api/client";
import { makeChatId } from "lib/chat/chatId";
import { FcInTransit } from "react-icons/fc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function UserPage({ id }) {
  const [user, setUser] = useState();
  const session = useSession();

  useEffect(() => {
    fetch(`/api/user?id=${id}`).then(async res => setUser(await res.json()));
  }, [id]);

  function handleWriteMessageClick() {
    // todo: dup (create AuthButton)
    if (session.status !== "authenticated") {
      router.push("/profile/signIn");
      return;
    }

    const authenticatedUserId = session.data.user.id;
    const chatId = makeChatId([authenticatedUserId, id]);
    post("chat", { chatId }).then(res => {
      if (res.ok) {
        router.push(`/chats?id=${chatId}`);
      } else {
        console.log("oops");
      }
    });
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>

      <Subpage
        title={
          <User name={user.name} imageUrl={user.image}>
            <Rating
              value={user.rating}
              reviewCount={user.reviewCount}
              reviewWrapper={children => (
                <ReviewLink userId={id}>{children}</ReviewLink>
              )}
            />
            <button
              className={utilStyles["button-tertiary"]}
              onClick={handleWriteMessageClick}
            >
              Write a message
            </button>
          </User>
        }
      >
        <ProductList
          filter={byUserId(id)}
          includeCategory={false}
          fallback={
            <Empty
              title="No products"
              Icon={FcInTransit}
              hint="come back later"
            />
          }
        />
      </Subpage>
    </>
  );
}
