/* eslint-disable consistent-return */
import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";

import authMiddleware from "../../middlewares/authMiddleware";

export default async (req: CustomRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await authMiddleware(req, res);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { user } = req;
    console.log(user);

    res.json({ success: true });
  }

  res.setHeader("Allow", "POST");
  res.status(405).end("Method not allowed");
};
