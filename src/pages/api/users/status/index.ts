/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import { getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";
import {
  dbInstanceConfig,
  dbInstancesUsersFinances,
} from "@/shared/services/firebase";

import authMiddleware from "../../middlewares/authMiddleware";

export default async (req: CustomRequest, res: NextApiResponse) => {
  try {
    await authMiddleware(req, res);
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
        where("status", "==", "approved"),
        where("createdAt", ">=", initialDayOfMonthUnix),
        where("createdAt", "<=", endDayOfMonthUnix)
      );

      const queryResult = await getDocs(q);

      const data = queryResult.docs.map((doc) => doc.data());

      const totalAmountWithoutPercent = data.reduce((acc, curr) => {
        const approvedDate = new Date(curr.approvedAt).getDate();

        if (actualDate.getDate() > approvedDate) {
          return acc + Number(curr.amount);
        }

        return Number(acc);
      }, 0);

      const findAmount =
        totalAmountWithoutPercent >= 5000
          ? 5000
          : totalAmountWithoutPercent >= 2000
          ? 2000
          : 500;

      const queryPercent = query(
        dbInstanceConfig,
        where("amountMin", "==", findAmount)
      );

      const queryPercentResult = await getDocs(queryPercent);

      const percentOfMonth = parseFloat(
        queryPercentResult.docs[0].data().percent
      );

      const percentCalc = (totalAmountWithoutPercent / 100) * percentOfMonth;
      const totalAmountWithPercent = totalAmountWithoutPercent + percentCalc;

      // Cache request
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=60"
      );

      return res.status(200).json({
        success: true,
        data: {
          totalAmountWithPercent,
          totalAmountWithoutPercent,
          percentOfMonth,
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
