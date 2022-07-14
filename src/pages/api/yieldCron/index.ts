/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest, yieldCronResponse } from "@/shared/interfaces/Common";
import {
  createLogs,
  getGlobalPercent,
  getPercentByValue,
} from "@/shared/services/config/percent";
import {
  dbInstancesUsersFinances,
  dbInstanceYield,
} from "@/shared/services/firebase";

import cronMiddleware from "../middlewares/cronMiddleware";

export default async (req: CustomRequest, res: NextApiResponse) => {
  try {
    await cronMiddleware(req, res);
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

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
        where("status", "==", "approved")
        // where("createdAt", ">=", initialDayOfMonthUnix),
        // where("createdAt", "<=", endDayOfMonthUnix)
      );

      const queryResult = await getDocs(q);

      // Pega daquelas que ja tiveram 1 dia de aprovado
      const data = queryResult.docs.map((reg) => {
        const obj = {} as any;

        const { amount, approvedAt, userId } = reg.data();

        const approvedDate = new Date(approvedAt).getDate();

        if (actualDate.getDate() > approvedDate) {
          obj.amount = parseFloat(amount);
          obj.userId = userId;
          obj.docId = reg.id;
        }

        return obj;
      });

      // soma os valores
      const formatObject: yieldCronResponse = data.reduce((acc, curr) => {
        if (curr.amount) {
          if (acc[curr.userId]) {
            acc[curr.userId] = {
              amount: acc[curr.userId].amount + curr.amount,
              docId: curr.docId,
            };
          } else {
            acc[curr.userId] = {
              amount: curr.amount,
              docId: curr.docId,
            };
          }
        }

        return acc;
      }, {} as yieldCronResponse);

      const createdAt = new Date().getTime();
      const globalPercent = await getGlobalPercent();

      Object.entries(formatObject)
        .filter(([e]) => e !== "undefined")
        .forEach(async ([key, value]) => {
          const amountToNumber = parseFloat(value.amount.toString());
          const getPercent = await getPercentByValue(amountToNumber);

          if (globalPercent >= getPercent) return;

          const percent = (amountToNumber / 100) * globalPercent;
          const amountWithPercent = amountToNumber + percent;

          addDoc(dbInstanceYield, {
            docId: value.docId,
            userId: key,
            amount: amountWithPercent,
            percent,
            createdAt,
            status: "in_wallet",
          });

          createLogs({
            userId: key,
            amount: amountToNumber,
            amountPercent: amountWithPercent,
            userPercent: getPercent,
          });
        });

      res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=3600"
      );

      return res.status(200).json({
        success: true,
        data: "All cron jobs executed! 🚀",
      });
    } catch (e) {
      console.log("🚀 ~ file: index.ts ~ line 91 ~ e", e);
      return res.status(500).json({
        success: false,
        message: "Oops, an error occurred.",
      });
    }
  }

  res.setHeader("Allow", "GET");
  res.status(405).end("Method not allowed");
};
