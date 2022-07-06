/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

import "../styles/globals.scss";
import { Toast } from "@/components/molecules";
import { ToastContainer } from "@/components/organims/ToastContainer";
import { CAPTCHA_CLIENT_KEY } from "@/shared/constants";

import { QueryClientProvider } from "react-query";

import { queryClient } from "@/shared/services/queryClient";

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
    <QueryClientProvider client={queryClient}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>

      <ToastContainer>
        <Toast>Welcome to Black Investiments! fdsfdsfdsfdsf</Toast>
        <Toast type="info">Welcome to Black Investiments! fdsfdsfdsfdsf</Toast>
      </ToastContainer>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
