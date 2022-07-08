/* eslint-disable no-return-await */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

import {
  LOGIN_COOKIE_ACCESS_TOKEN,
  LOGIN_COOKIE_NAME,
  LOGIN_COOKIE_REFRESH_TOKEN,
} from "@/shared/constants";
import { wrapper } from "@/shared/store";

export function GuestSSR<P>(fn: GetServerSideProps<P>) {
  return wrapper.getServerSideProps((store) => {
    return async (
      ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(ctx);
      const userIsLogged =
        cookies[LOGIN_COOKIE_REFRESH_TOKEN] &&
        cookies[LOGIN_COOKIE_ACCESS_TOKEN] &&
        cookies[LOGIN_COOKIE_NAME];

      if (userIsLogged) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }

      return await fn(ctx);
    };
  });
}
