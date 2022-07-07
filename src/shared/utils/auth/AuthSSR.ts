/* eslint-disable no-return-await */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

import { LOGIN_COOKIE_NAME } from "@/shared/constants";
import { wrapper } from "@/shared/store";
import { setUser } from "@/shared/store/reducers/user";

export function AuthSSR<P>(fn: GetServerSideProps<P>) {
  return wrapper.getServerSideProps((store) => {
    return async (
      ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(ctx);
      const userCookie = cookies[LOGIN_COOKIE_NAME];

      if (!userCookie) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      const parsedCookie = JSON.parse(userCookie);

      if (parsedCookie) {
        store.dispatch(setUser(parsedCookie));
      }

      return await fn(ctx);
    };
  });
}
