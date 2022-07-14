/* eslint-disable consistent-return */
import { doc, setDoc } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";
import { getGlobalPercent } from "@/shared/services/config/percent";
import { dbInstanceConfig } from "@/shared/services/firebase";

import authMiddleware from "../../middlewares/authMiddleware";

export default async (req: CustomRequest, res: NextApiResponse) => {
  try {
    await authMiddleware(req, res, true);
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const actualPercent = await getGlobalPercent();

  if (req.method === "PATCH") {
    const { percent } = req.body;

    if (!percent) {
      return res.status(400).json({
        success: false,
        message: "Percent is required",
      });
    }

    if (Number.isNaN(parseFloat(percent))) {
      return res.status(400).json({
        success: false,
        message: "Percent is not a number",
      });
    }

    try {
      await setDoc(doc(dbInstanceConfig, "global_percent"), {
        percent: parseFloat(percent),
      });

      return res.status(200).json({
        success: true,
        message: "Percent updated!",
      });
    } catch (error) {
      return res.status(500).json({});
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      percent: actualPercent,
    });
  }
};
