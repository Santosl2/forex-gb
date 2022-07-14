/* eslint-disable consistent-return */
import Cors from "cors";
import { NextApiResponse } from "next/types";

import { CustomRequest } from "@/shared/interfaces/Common";

const cors = Cors({
  origin: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/",
});

const corsMiddleware = async (req: CustomRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        console.log("opa");
        return reject(result);
      }
      resolve(result);
    });
  });
};

export default corsMiddleware;
