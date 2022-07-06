/* eslint-disable import/no-extraneous-dependencies */
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { render } from "@testing-library/react";

export const queryClientTest = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const customRender = (component: any, initialState: any = {}) => {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClientTest}>
        {children}
      </QueryClientProvider>
    );
  }
  return render(component, { wrapper: Wrapper });
};
