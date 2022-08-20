import utilStyles from "styles/utils.module.scss";
import Subpage from "components/Subpage";
import User from "components/User";
import ProductList from "components/ProductList";
import Empty from "components/Empty";
import Rating from "components/Rating";
import ReviewLink from "components/ReviewLink";
import AuthButton from "components/AuthButton";
import withDataFetching from "components/withDataFetching";
import { byUserId } from "lib/db/productFilters";
import { get, post } from "lib/api/client";
import { makeChatId } from "lib/chat/chatId";
import { PaybackError } from "lib/errors";
import { FcInTransit } from "react-icons/fc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

function UserPage({ id, fetchedData: user }) {
  const session = useSession();
  const router = useRouter();

  function handleWriteMessageClick() {
    const authenticatedUserId = session.data.user.id;
    const chatId = makeChatId([authenticatedUserId, id]);
    post("/api/chat", { chatId })
      .then(() => {
        router.push(`/chats?id=${chatId}`);
      })
      .catch(err => {
        throw new PaybackError(
          `Failed to create or load a chat with ${user.name}`,
          err
        );
      });
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

export default withDataFetching(
  UserPage,
  ({ id }) => get(`/api/user?id=${id}`),
  props => ({ id: props.id })
);
