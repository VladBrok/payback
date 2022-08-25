import styles from "./SignInPage.module.scss";
import utilStyles from "styles/utils.module.scss";
import Image from "components/Image";
import Error from "components/Error";
import providers from "data/authProviders.json";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignInPage() {
  const { error } = useRouter().query;

  const providerList = providers.map(provider => (
    <li key={provider.id}>
      <button
        type="button"
        className={utilStyles["button-secondary"]}
        onClick={() =>
          signIn(provider.id, { callbackUrl: "/profile/products" })
        }
      >
        <Image className={styles.image} src={provider.image} alt="" priority />{" "}
        Sign in with <span className={styles.provider}>{provider.id}</span>
      </button>
    </li>
  ));

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>Sign in</h1>
        {error && <Error>Please try sign in with a different provider</Error>}
        <ul className={styles.list}>{providerList}</ul>
      </div>
    </>
  );
}
