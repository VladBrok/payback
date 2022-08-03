import styles from "./signIn.module.scss";
import utilStyles from "styles/utils.module.scss";
import Image from "components/Image";
import providerData from "data/authProviders.json";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignInPage({ providers }) {
  const { error } = useRouter().query;

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
        {error && (
          <p className={styles.error}>
            Please try sign in with a different provider
          </p>
        )}
        <ul className={styles.list}>{providerList}</ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
