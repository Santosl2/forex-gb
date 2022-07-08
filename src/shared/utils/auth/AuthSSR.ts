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
import { UserData } from "@/shared/interfaces/User";
import { wrapper } from "@/shared/store";

import { getUserData, logoutUser } from "./UserLogin";

export function AuthSSR<P>(fn: GetServerSideProps<P>) {
  return wrapper.getServerSideProps((store) => {
    return async (
      ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(ctx);
      const userIsLogged =
        cookies[LOGIN_COOKIE_REFRESH_TOKEN] &&
        cookies[LOGIN_COOKIE_ACCESS_TOKEN] &&
        cookies[LOGIN_COOKIE_NAME];

      if (!userIsLogged) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      try {
        const data = JSON.parse(cookies[LOGIN_COOKIE_NAME]) as UserData;
        const accessToken = JSON.parse(
          cookies[LOGIN_COOKIE_ACCESS_TOKEN]
        ) as UserData;
        const refreshToken = JSON.parse(
          cookies[LOGIN_COOKIE_REFRESH_TOKEN]
        ) as UserData;

        if (data.email) {
          getUserData(
            {
              ...data,
              ...accessToken,
              ...refreshToken,
            },
            store,
            ctx
          );
        } else {
          logoutUser(ctx);

          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
          };
        }
      } catch {
        logoutUser(ctx);

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return await fn(ctx);
    };
  });
}
