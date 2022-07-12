/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest, yieldCronResponse } from "@/shared/interfaces/Common";
import {
  dbInstanceConfig,
  dbInstancesUsersFinances,
  dbInstanceYield,
} from "@/shared/services/firebase";

import cronMiddleware from "../middlewares/cronMiddleware";

async function getPercentByValue(totalPercent: number) {
  const value = totalPercent >= 5000 ? 5000 : totalPercent >= 2000 ? 2000 : 500;

  const queryPercent = query(dbInstanceConfig, where("amountMin", "==", value));

  const getPercent = await getDocs(queryPercent);

  const percent = parseFloat(getPercent.docs[0]?.data().percent);

  return percent;
}

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
        where("status", "==", "approved"),
        where("createdAt", ">=", initialDayOfMonthUnix),
        where("createdAt", "<=", endDayOfMonthUnix)
      );

      const queryResult = await getDocs(q);

      // Pega daquelas que ja tiveram 1 dia de aprovado
      const data = queryResult.docs.map((reg) => {
        const obj = {} as any;

        const { amount, approvedAt, userId } = reg.data();

        const approvedDate = new Date(approvedAt).getDate();

        if (actualDate.getDate() > approvedDate) {
          obj.amount = Number(amount);
          obj.userId = userId;
        }

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

      const result = Object.entries(formatObject)
        .filter(([e]) => e !== "undefined")
        .forEach(async ([userId, amount]) => {
          const amountToNumber = Number(amount);
          const getPercent = await getPercentByValue(amountToNumber);
          const percent = (amountToNumber / 100) * getPercent;
          const amountWithPercent = amountToNumber + percent;

          addDoc(dbInstanceYield, {
            userId,
            amount: amountWithPercent,
            createdAt,
          });

          console.log(
            `🚀 [Yield Cron] ${userId} - ${amountToNumber} - ${getPercent}/${percent}% = ${amountWithPercent}`
          );
        });

      res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=3600"
      );

      return res.status(200).json({
        success: true,
        data: result,
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
