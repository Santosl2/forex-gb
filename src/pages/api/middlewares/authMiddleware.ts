import jwtDecode from "jwt-decode";
import { NextApiResponse } from "next";

import { LOGIN_COOKIE_NAME } from "@/shared/constants";
import { CustomRequest } from "@/shared/interfaces/Common";

const middleware = async (
  req: CustomRequest,
  res: NextApiResponse,
  onlyAdmin = false
) => {
  const { headers } = req;

  const authHeader = headers.authorization;

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub, exp } = jwtDecode(token) as any;

    if (onlyAdmin) {
      const { [LOGIN_COOKIE_NAME]: userToken } = req.cookies;

      try {
        const parseToken = JSON.parse(userToken);

        if (!parseToken.isAdmin) {
          throw new Error("Unauthorized");
        }
      } catch {
        throw new Error("Unauthorized");
      }
    }

    req.user = sub;
  } catch (e) {
    throw new Error("Unauthorized");
  }
};

export default middleware;
