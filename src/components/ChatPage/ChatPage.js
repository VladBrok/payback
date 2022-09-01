import Subpage from "components/Subpage";
import Chat from "components/Chat";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import useSessionUser from "hooks/useSessionUser";
import Head from "next/head";

function ChatPage({ id, fetchedData: chat }) {
  const userId = useSessionUser().id;

  return (
    <>
      <Head>
        <title>Chat with {chat?.name}</title>
      </Head>
      <Subpage title={<h1>{chat?.name}</h1>}>
        <Chat userId={userId} chatId={id} />
      </Subpage>
    </>
  );
}

export default withDataFetching(
  ChatPage,
  ({ id }) => get(`/api/chat?id=${id}`),
  props => ({ id: props.id }),
  true
);
