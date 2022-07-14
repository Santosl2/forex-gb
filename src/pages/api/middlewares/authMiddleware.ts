import jwtDecode from "jwt-decode";
import { NextApiResponse } from "next";

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
    const { sub, exp, isAdmin } = jwtDecode(token) as any;

    if (exp < Date.now() / 1000) {
      // throw new Error("Token expired");
    }

    if (onlyAdmin) {
      // protect route
    }

    req.user = sub;
  } catch (e) {
    console.log("🚀 ~ file: authMiddleware.ts ~ line 25 ~ middleware ~ e", e);
    throw new Error("Unauthorized");
  }
};

export default middleware;
