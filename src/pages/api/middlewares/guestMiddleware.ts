import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";

const middleware = async (req: CustomRequest, res: NextApiResponse) => {
  const { headers } = req;

  const authHeader = headers.authorization;

  if (authHeader) {
    throw new Error("Unauthorized");
  }
};

export default middleware;
