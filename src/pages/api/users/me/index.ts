/* eslint-disable consistent-return */
import { getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next/types";

import { CustomRequest } from "@/shared/interfaces/Common";
import { dbInstanceUsers } from "@/shared/services/firebase";

import authMiddleware from "../../middlewares/authMiddleware";

const index = async (req: CustomRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await authMiddleware(req, res);

      const q = query(dbInstanceUsers, where("id", "==", req.user));
      const queryResult = await getDocs(q);

      if (queryResult.size === 0) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      const doc = queryResult.docs[0];
      const { name: username, id, email } = doc.data();

      res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
      );

      return res.json({
        success: true,
        name: username,
        id,
        email,
      });
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
  }

  res.setHeader("Allow", "GET");
  res.status(405).end("Method not allowed");
};

export default index;
