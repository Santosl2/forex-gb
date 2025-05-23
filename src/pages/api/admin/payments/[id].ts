/* eslint-disable consistent-return */
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest, statusTypes } from "@/shared/interfaces/Common";
import {
  dbInstancesUsersFinances,
  dbInstanceUsers,
  dbInstanceYield,
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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment ID",
    });
  }

  if (req.method === "GET") {
    try {
      const q = query(dbInstancesUsersFinances, where("userId", "==", id));
      const queryResult = await getDocs(q);

      const qUser = query(dbInstanceUsers, where("id", "==", id));
      const queryResultUser = await getDocs(qUser);

      if (queryResult.size === 0 || queryResultUser.size === 0) {
        return res.status(200).json({
          success: true,
          message: "No data",
        });
      }

      const { walletId } = queryResultUser.docs[0].data();

      const data = queryResult.docs.map((docData) => {
        const { id: docId } = docData;
        const { amount, status, url, createdAt, approvedAt } = docData.data();

        return {
          id: docId,
          amount,
          status,
          url,
          walletId,
          createdAt,
          approvedAt: approvedAt ?? null,
        };
      });

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

  if (req.method === "PATCH") {
    const { status } = req.body;

    if (
      statusTypes.find((s) => s.toLocaleLowerCase() === status)?.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    try {
      let data: any = {
        status,
      };

      if (status === "approved") {
        data = {
          ...data,
          approvedAt: new Date().getTime(),
        };
      }

      if (status === "paid") {
        const qYields = query(dbInstanceYield, where("docId", "==", id));

        const qUpdateYields = await getDocs(qYields);

        qUpdateYields.docs.forEach(async (docData) => {
          const { id: docId } = docData;

          await updateDoc(doc(dbInstanceYield, docId), {
            status: "paid",
          });
        });
      }

      await updateDoc(doc(dbInstancesUsersFinances, id.toString()), data);

      return res.status(200).json({
        success: false,
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      // todo delete image from storage
      await deleteDoc(doc(dbInstancesUsersFinances, id.toString()));

      return res.status(200).json({
        success: false,
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
