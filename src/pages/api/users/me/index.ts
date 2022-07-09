/* eslint-disable consistent-return */
import { getDocs, query, where } from "firebase/firestore";
import jwtDecode from "jwt-decode";
import { NextApiRequest, NextApiResponse } from "next/types";

import { dbInstanceUsers } from "@/shared/services/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { headers } = req;
    const authHeader = headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }

    try {
      const [, token] = (authHeader as string).split(" ");

      const { sub } = jwtDecode(token) as any;

      const q = query(dbInstanceUsers, where("id", "==", sub));
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
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
  }

  res.setHeader("Allow", "GET");
  res.status(405).end("Method not allowed");
};
