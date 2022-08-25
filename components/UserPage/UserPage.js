import utilStyles from "styles/utils.module.scss";
import Subpage from "components/Subpage";
import User from "components/User";
import ProductList from "components/ProductList";
import Empty from "components/Empty";
import Rating from "components/Rating";
import ReviewLink from "components/ReviewLink";
import AuthButton from "components/AuthButton";
import withDataFetching from "components/withDataFetching";
import { get, post } from "lib/api/client";
import { makeChatId } from "lib/chat/chatId";
import { PaybackError } from "lib/errors";
import useSessionUser from "hooks/useSessionUser";
import { FcInTransit } from "react-icons/fc";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

function UserPage({ id, products, productFilter, fetchedData: user }) {
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const sessionUser = useSessionUser();
  const router = useRouter();

  function handleWriteMessageClick() {
    const authenticatedUserId = sessionUser.id;
    const chatId = makeChatId([authenticatedUserId, id]);

    setIsLoadingChat(true);
    post("/api/chat", { chatId })
      .then(() => {
        router.push(`/chats/${chatId}`);
      })
      .catch(err => {
        throw new PaybackError(
          `Failed to create or load a chat with ${user.name}`,
          err
        );
      })
      .finally(() => {
        setIsLoadingChat(false);
      });
  }

  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>

      <Subpage
        title={
          <User name={<h1>{user.name}</h1>} imageUrl={user.image}>
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
              disabled={isLoadingChat}
            >
              Write a message
            </AuthButton>
          </User>
        }
      >
        <h2 className={utilStyles["sr-only"]}>Products of {user.name}</h2>
        <ProductList
          data={products}
          filter={productFilter}
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

export default withDataFetching(
  UserPage,
  ({ id }) => get(`/api/user?id=${id}`),
  props => ({ id: props.id })
);
