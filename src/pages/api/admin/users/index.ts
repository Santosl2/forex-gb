/* eslint-disable consistent-return */
import { getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";
import {
  dbInstancesUsersFinances,
  dbInstanceUsers,
} from "@/shared/services/firebase";

import authMiddleware from "../../middlewares/authMiddleware";
import corsMiddleware from "../../middlewares/corsMiddleware";

export default async (req: CustomRequest, res: NextApiResponse) => {
  try {
    await authMiddleware(req, res, true);
    await corsMiddleware(req, res);
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.method === "GET") {
    try {
      const q = query(dbInstanceUsers);
      const queryResult = await getDocs(q);

      const formatData = queryResult.docs.map(async (doc) => {
        const { email, id, isAdmin, name } = doc.data();

        const qUserFinances = query(
          dbInstancesUsersFinances,
          where("userId", "==", id)
        );

        const qResult = await getDocs(qUserFinances);

        const totalAmountApproved = qResult.docs
          .filter((e) => e.data().status === "approved")
          .reduce((acc, cur) => acc + parseFloat(cur.data().amount), 0);

        const totalAmountPending = qResult.docs
          .filter((e) => e.data().status === "pending")
          .reduce((acc, cur) => acc + parseFloat(cur.data().amount), 0);

        return {
          id,
          name,
          email,
          isAdmin,
          totalAmountApproved,
          totalAmountPending,
        };
      });

      const data = await Promise.all(formatData);

      res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=60"
      );

      return res.status(200).json({
        success: true,
        data,
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
