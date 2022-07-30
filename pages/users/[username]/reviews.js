import { useRouter } from "next/router";

export default function ReviewsPage() {
  const router = useRouter();
  const { username } = router.query;

  return <h1>Reviews for {username}</h1>;
}
