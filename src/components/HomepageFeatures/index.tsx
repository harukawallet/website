import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Secure",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Your data is securely encrypted on your device. With a non-custodial
        wallet, you have sole control of your private keys and cryptocurrency
        funds.
      </>
    ),
  },
  {
    title: "Truly decentralized",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        The wallet app is built without reliance on a single centralized
        backend. Instead, it leverages a network of publicly accessible nodes to
        gather essential blockchain data.
      </>
    ),
  },
  {
    title: "Integrated DEX",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        The wallet app ships with a built-in decentralized exchange (DEX). It
        employs Hashed Timelock Contracts (HTLC) to enable seamless cross-chain
        atomic swaps between XRP Ledger and Bitcoin or Ethereum based
        blockchains.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
