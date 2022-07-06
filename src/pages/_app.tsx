/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

import "../styles/globals.scss";
import { ToastContainer } from "@/components/organims/ToastContainer";
import { CAPTCHA_CLIENT_KEY } from "@/shared/constants";

import { QueryClientProvider } from "react-query";

import { queryClient } from "@/shared/services/queryClient";

import { Provider } from "react-redux";

import { store } from "@/shared/store";

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback: () => void) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${CAPTCHA_CLIENT_KEY}`,
      () => {
        console.log("Script loaded!");
      }
    );
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>

        <ToastContainer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
