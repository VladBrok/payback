import { useRouter } from "next/router";
import Head from "next/head";

export default function ReviewsPage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <Head>
        <title>{username} reviews</title>
      </Head>
      <h1>Reviews for {username}</h1>
    </>
  );
}
