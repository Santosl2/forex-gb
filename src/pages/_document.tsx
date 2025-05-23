import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@200;400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon.ico"
        />
      </Head>
      <body data-theme="dark">
        <Main />
        <NextScript />
        <div id="drawerPortal" />
        <div id="modalPortal" />
        <div id="modalWalletPortal" />
      </body>
    </Html>
  );
}
