/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import { getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";
import {
  getGlobalPercent,
  getPercentByValue,
} from "@/shared/services/config/percent";
import {
  dbInstancesUsersFinances,
  dbInstanceYield,
} from "@/shared/services/firebase";

import authMiddleware from "../../middlewares/authMiddleware";
import corsMiddleware from "../../middlewares/corsMiddleware";

export default async (req: CustomRequest, res: NextApiResponse) => {
  try {
    await authMiddleware(req, res);
    await corsMiddleware(req, res);
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { user } = req;

  const actualDate = new Date();
  let initialDayOfMonthUnix = 0;
  const totalDaysOfMonth = new Date(2022, actualDate.getMonth() + 1, 0);
  const endDayOfMonthUnix = totalDaysOfMonth.getTime();

  if (actualDate.getDate() === 1) {
    initialDayOfMonthUnix = actualDate.getTime();
  } else {
    initialDayOfMonthUnix =
      actualDate.getTime() - (actualDate.getDate() - 1) * (86400 * 1000);
  }

  if (req.method === "GET") {
    try {
      const q = query(
        dbInstancesUsersFinances,
        where("userId", "==", user),
        where("status", "==", "approved")
        // where("createdAt", ">=", initialDayOfMonthUnix),
        // where("createdAt", "<=", endDayOfMonthUnix)
      );

      const queryResult = await getDocs(q);

      const qYield = query(
        dbInstanceYield,
        where("userId", "==", user),
        where("status", "==", "in_wallet")
      );

      const queryResultYields = await getDocs(qYield);

      const data = queryResult.docs.map((doc) => doc.data().amount);
      const userYields = queryResultYields.docs.map(
        (doc) => doc.data().percent
      );

      const totalUserYields = userYields.reduce(
        (acc, curr) => acc + parseFloat(curr),
        0
      );
      const totalUserAmount = data.reduce(
        (acc, curr) => acc + parseFloat(curr),
        0
      );

      const percentOfMonth = await getGlobalPercent();
      const userPercent = await getPercentByValue(totalUserAmount);

      const totalAmountWithPercent =
        totalUserYields > 0 ? totalUserYields + totalUserAmount : 0;
      // Cache request
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=60"
      );

      return res.status(200).json({
        success: true,
        data: {
          totalAmountWithPercent,
          totalAmountWithoutPercent: totalUserAmount,
          totalAmountPercent: totalUserYields,
          percentOfMonth,
          canYield: userPercent > percentOfMonth,
        },
      });
    } catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 91 ~ e", e);
      return res.status(500).json({
        success: false,
        message: "Oops, an error occurred.",
      });
    }
  }
};
