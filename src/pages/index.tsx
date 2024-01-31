import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { fetchTotalDownloads } from "@site/src/api/github";
import { nFormatter } from "@site/src/util/format";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [data, setData] = React.useState<bigint | null>();

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const count = await fetchTotalDownloads(
          siteConfig.customFields.githubReleaseUser as string,
          siteConfig.customFields.githubReleaseRepo as string
        );
        if (mounted) {
          setData(count);
        }
      } catch (err) {
        console.debug(err);
        if (mounted) {
          setData(null);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <header
      className={clsx("footer footer--dark", styles.heroBanner)}
      data-theme="dark"
    >
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <Link className="button button--primary button--lg" to="/download">
          Download Alpha
        </Link>
        <Heading as="h3" className="margin-top--md">
          {data ? nFormatter(Number(data), 0) : "?"}+ Downloads
        </Heading>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Multi-chain Desktop Wallet"
      description="Haruka is a multi-chain desktop wallet with a built-in decentralized exchange (DEX). It employs Hashed Timelock Contracts (HTLC) to enable seamless cross-chain atomic swaps between XRPL and Bitcoin or Ethereum based blockchains."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
