/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { ReactQueryDevtools } from "react-query/devtools";

import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

import "../styles/globals.scss";
import NextNProgress from "nextjs-progressbar";
import "react-toastify/dist/ReactToastify.css";

import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import { LogoutButton } from "@/components/atoms/LogoutButton/LogoutButton";
import { ModalAdd } from "@/components/organims/ModalAddMoney";
import { useUser } from "@/shared/hooks/useUser";
import { queryClient } from "@/shared/services/queryClient";

import { Provider } from "react-redux";

import { store, wrapper } from "@/shared/store";

function MyApp({ Component, pageProps, router }: AppProps) {
  const { name, id } = useUser();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <main className="w-screen h-screen overflow-hidden bg-gray-body">
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>

          <ModalAdd />
        </main>
        {name && id && router.route !== "/" && <LogoutButton />}

        <ToastContainer
          className="customToast"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <NextNProgress
          color="#737373"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow
        />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
