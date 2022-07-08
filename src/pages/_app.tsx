/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { ReactQueryDevtools } from "react-query/devtools";

import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

import "../styles/globals.scss";
import NextNProgress from "nextjs-progressbar";

import { ToastContainer } from "@/components/organims/ToastContainer";

import { QueryClientProvider } from "react-query";

import { queryClient } from "@/shared/services/queryClient";

import { Provider } from "react-redux";

import { store, wrapper } from "@/shared/store";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <main className="w-screen h-screen overflow-hidden">
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </main>
        <ToastContainer />
        <ReactQueryDevtools />
        <NextNProgress
          color="#737373"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow
        />
      </QueryClientProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
