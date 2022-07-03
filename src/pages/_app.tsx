/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

import "../styles/globals.scss";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;
