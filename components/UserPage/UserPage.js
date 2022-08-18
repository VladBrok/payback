import utilStyles from "styles/utils.module.scss";
import Subpage from "components/Subpage";
import User from "components/User";
import ProductList from "components/ProductList";
import Empty from "components/Empty";
import Rating from "components/Rating";
import Loading from "components/Loading";
import ReviewLink from "components/ReviewLink";
import AuthButton from "components/AuthButton";
import { byUserId } from "lib/db/productFilters";
import { post } from "lib/api/client";
import { makeChatId } from "lib/chat/chatId";
import { FcInTransit } from "react-icons/fc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserPage({ id }) {
  const [user, setUser] = useState();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/user?id=${id}`).then(async res => setUser(await res.json()));
  }, [id]);

  function handleWriteMessageClick() {
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
            <AuthButton
              className={utilStyles["button-tertiary"]}
              onClick={handleWriteMessageClick}
            >
              Write a message
            </AuthButton>
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
