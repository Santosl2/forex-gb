/* eslint-disable import/no-extraneous-dependencies */
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { RootState } from "@/shared/store";
import { combinedReducers } from "@/shared/store/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";

export const queryClientTest = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const testStore = (state: Partial<RootState>) => {
  return configureStore({
    reducer: combinedReducers,
    preloadedState: state,
  });
};

export const customRender = (
  component: ReactNode,
  initialState: any = {},
  renderFn: ReturnType<typeof render> | any = render
) => {
  const mockStore = testStore(initialState);

  const obj = {
    ...renderFn(
      <Provider store={mockStore}>
        <QueryClientProvider client={queryClientTest}>
          {component}
        </QueryClientProvider>
        <ToastContainer />
      </Provider>
    ),
    mockStore,
  };

  return obj;
};
