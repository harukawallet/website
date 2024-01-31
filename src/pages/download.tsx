import React from "react";
import clsx from "clsx";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { fetchLatestRelease, type Release } from "@site/src/api/github";
import Heading from "@theme/Heading";

import styles from "./download.module.css";

type Platform = "linux" | "win" | "mac";

type Urls = {
  [key in Platform]: string;
};

export default function Download(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [data, setData] = React.useState<Release | null>();

  const user = siteConfig.customFields.githubReleaseUser as string;
  const repo = siteConfig.customFields.githubReleaseRepo as string;
  const fallbackDownloadUrl = `https://github.com/${user}/${repo}/releases`;

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const release = await fetchLatestRelease(user, repo);
        if (mounted) {
          setData(release);
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

  const urls: Urls = React.useMemo(() => {
    const assetLinux = data?.assets.find((x) => x.name.endsWith(".deb"));
    const assetWindows = data?.assets.find((x) => x.name.endsWith(".exe"));
    const assetMac = data?.assets.find((x) => x.name.endsWith(".dmg"));

    return {
      linux: assetLinux?.browser_download_url ?? fallbackDownloadUrl,
      win: assetWindows?.browser_download_url ?? fallbackDownloadUrl,
      mac: assetMac?.browser_download_url ?? fallbackDownloadUrl,
    };
  }, [data]);

  return (
    <Layout
      title="Download"
      description="Download Haruka Wallet to safely store your crypto"
    >
      <header
        className={clsx("footer footer--dark", styles.header)}
        data-theme="dark"
      >
        <div className="container">
          <Heading as="h1" className="hero__title">
            Download the Latest Alpha Release
          </Heading>
          <p className="hero__subtitle">{data?.name ?? "Haruka Wallet"}</p>
        </div>
      </header>
      <div className="container padding-vert--xl">
        <div className={styles["layout-grid"]}>
          <div className={clsx(styles.tile, styles.item1)}>
            <Heading as="h1">Linux</Heading>
            <Link
              className="button button--primary button--lg"
              href={urls.linux}
              target="_self"
            >
              Download
            </Link>
            <img
              className={styles.image}
              src={require("@site/static/img/logo_linux.png").default}
              alt="Linux"
            />
          </div>
          <div className={clsx(styles.tile, styles.item2)}>
            <Heading as="h1">Windows</Heading>
            <Link
              className="button button--primary button--lg"
              href={urls.win}
              target="_self"
            >
              Download
            </Link>
            <img
              className={styles.image}
              src={require("@site/static/img/logo_windows.png").default}
              alt="Windows"
            />
          </div>
          <div className={clsx(styles.tile, styles.item3)}>
            <Heading as="h1">Mac</Heading>
            <Link
              className="button button--primary button--lg"
              href={urls.mac}
              target="_self"
            >
              Download
            </Link>
            <img
              className={styles.image}
              src={require("@site/static/img/logo_mac.png").default}
              alt="Mac"
            />
          </div>
          <div className={clsx(styles.tile, styles.item4)}>
            <Heading as="h1">Other Releases</Heading>
            <Heading as="h4">More file formats are available on GitHub</Heading>
            <Link
              className="button button--primary button--lg"
              href={fallbackDownloadUrl}
              target="_self"
            >
              Download
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
