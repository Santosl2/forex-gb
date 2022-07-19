/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest, yieldCronResponse } from "@/shared/interfaces/Common";
import {
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

  const dateMoreOneDay = new Date().getTime() + 86400 * 1000;
  // let initialDayOfMonthUnix = 0;
  // const totalDaysOfMonth = new Date(2022, actualDate.getMonth() + 1, 0);
  // const endDayOfMonthUnix = totalDaysOfMonth.getTime();

  // if (actualDate.getDate() === 1) {
  //   initialDayOfMonthUnix = actualDate.getTime();
  // } else {
  //   initialDayOfMonthUnix =
  //     actualDate.getTime() - (actualDate.getDate() - 1) * (86400 * 1000);
  // }

  if (req.method === "GET") {
    try {
      const q = query(
        dbInstancesUsersFinances,
        where("status", "==", "approved"),
        where("approvedAt", "<", dateMoreOneDay)
        // where("createdAt", "<=", endDayOfMonthUnix)
      );

      const queryResult = await getDocs(q);

      // Pega daquelas que ja tiveram 1 dia de aprovado
      const data = queryResult.docs.map((reg) => {
        const obj = {} as any;

        const { amount, userId } = reg.data();

        obj.amount = parseFloat(amount);
        obj.userId = userId;
        obj.docId = reg.id;

        return obj;
      });

      // soma os valores
      const formatObject: yieldCronResponse = data.reduce((acc, curr) => {
        if (curr.amount) {
          if (acc[curr.userId]) {
            acc[curr.userId] += curr.amount;
          } else {
            acc[curr.userId] = curr.amount;
          }
        }

        return acc;
      }, {} as yieldCronResponse);

      const createdAt = new Date().getTime();
      const globalPercent = await getGlobalPercent();

      Object.entries(data)
        .filter(([e]) => e !== "undefined")
        .forEach(async ([, { userId, docId, amount }]) => {
          const userIdAmount = formatObject[userId];

          const amountToNumber = parseFloat(userIdAmount.toString());
          const getPercent = await getPercentByValue(amountToNumber);

          if (globalPercent >= getPercent) return;

          const percent = (amount / 100) * globalPercent;
          const amountWithPercent = amount + percent;

          addDoc(dbInstanceYield, {
            docId,
            userId,
            amount: amountWithPercent,
            percent,
            createdAt,
            status: "in_wallet",
          });

          // createLogs({
          //   userId: key,
          //   amount: amountToNumber,
          //   amountPercent: amountWithPercent,
          //   userPercent: getPercent,
          // });
        });

      return res.status(200).json({
        success: true,
        data: `All cron jobs executed! 🚀${data.length}`,
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
