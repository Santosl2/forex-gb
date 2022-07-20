/* eslint-disable consistent-return */
import { doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";
import { dbInstancesUsersFinances } from "@/shared/services/firebase";
import { canWithDraw } from "@/shared/utils/common";

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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment ID",
    });
  }

  const q = query(dbInstancesUsersFinances, where("userId", "==", user));
  const queryResult = await getDocs(q);

  const findId = queryResult.docs.find((d) => d.id === id);

  if (queryResult.size === 0 || !findId?.exists) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment ID",
    });
  }

  if (req.method === "POST") {
    const docData = findId.data();

    if (docData.status === "request_withdraw") {
      return res.status(400).json({
        success: false,
        message: "Payment is already requested",
      });
    }

    if (docData.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Payment not approved",
      });
    }

    if (!canWithDraw()) {
      return res.status(400).json({
        success: false,
        message: "You can request withdraw only in first day of month.",
      });
    }

    try {
      await updateDoc(doc(dbInstancesUsersFinances, id.toString()), {
        status: "request_withdraw",
      });

      return res.status(200).json({
        success: true,
        message: "Success! Your withdrawal has been requested.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Oops, an error occurred.",
      });
    }
  }
};
