/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest, StatisticsTypes } from "@/shared/interfaces/Common";
import { dbInstanceYield } from "@/shared/services/firebase";

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

  if (req.method === "GET") {
    try {
      const q = query(
        dbInstanceYield,
        where("userId", "==", user),
        where("status", "==", "in_wallet"),
        orderBy("createdAt", "asc")
      );

      const queryResult = await getDocs(q);

      const statisticsReduce = queryResult.docs.reduce((acc, curr) => {
        const { createdAt, percent } = curr.data() as StatisticsTypes;
        const formatCreatedAt: any = new Date(createdAt).toLocaleDateString();

        if (percent && !acc[formatCreatedAt]) {
          acc[formatCreatedAt] = {
            percent,
            createdAt,
          };
        } else {
          acc[formatCreatedAt] = {
            ...acc[formatCreatedAt],
            percent: Math.ceil(acc[formatCreatedAt].percent + percent),
          };
        }

        return acc;
      }, [] as StatisticsTypes[]);

      const formatData = Object.entries(statisticsReduce).map(([, value]) => ({
        ...value,
      }));

      // Cache request
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=60"
      );

      return res.status(200).json({
        success: true,
        data: formatData,
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
