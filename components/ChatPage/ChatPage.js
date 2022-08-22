import Subpage from "components/Subpage";
import Chat from "components/Chat";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import Head from "next/head";
import { useSession } from "next-auth/react";

function ChatPage({ id, fetchedData: chat }) {
  const {
    data: { user },
  } = useSession();
  const userId = user.id;

  return (
    <>
      <Head>
        <title>Chat with {chat?.name}</title>
      </Head>
      <Subpage title={chat?.name}>
        <Chat userId={userId} chatId={id} />
      </Subpage>
    </>
  );
}

ChatPage.auth = true;
const hoc = withDataFetching(
  ChatPage,
  ({ id }) => get(`/api/chat?id=${id}`),
  props => ({ id: props.id }),
  true
);
hoc.auth = ChatPage.auth;

export default hoc;
