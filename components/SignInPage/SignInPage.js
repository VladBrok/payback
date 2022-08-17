import styles from "./SignInPage.module.scss";
import utilStyles from "styles/utils.module.scss";
import Image from "components/Image";
import Error from "components/Error";
import providerData from "data/authProviders.json";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function SignInPage() {
  const [providers, setProviders] = useState({});
  const { error } = useRouter().query;

  useEffect(() => {
    (async () => setProviders(await getProviders()))();
  }, []);

  const providerList = Object.values(providers).map(p => (
    <li key={p.id}>
      <button
        type="button"
        className={utilStyles["button-secondary"]}
        onClick={() => signIn(p.id, { callbackUrl: "/profile/products" })}
      >
        <Image
          className={styles.image}
          src={providerData.find(d => d.id === p.id).image}
          alt=""
          priority
        />{" "}
        Sign in with {p.name}
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
