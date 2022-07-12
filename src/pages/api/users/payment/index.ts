/* eslint-disable consistent-return */
import { addDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { ModalAddFormData } from "@/components/organims/ModalAdd/ModalAdd.types";
import { CustomRequest } from "@/shared/interfaces/Common";
import { modalAddSchema } from "@/shared/schemas/modal";
import {
  dbInstancesUsersFinances,
  uploadFile,
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

  if (req.method === "POST") {
    const { amount, voucherFile } = req.body as Record<
      keyof ModalAddFormData,
      string
    >;

    try {
      await modalAddSchema.validate({
        amount,
        voucherFile,
      });
    } catch (e: any) {
      console.log("🚀 ~ file: index.ts ~ line 37 ~ e", e);
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    try {
      const data = await uploadFile(voucherFile, "data_url");

      addDoc(dbInstancesUsersFinances, {
        userId: user,
        url: data,
        amount: amount.replace("$", ""),
        status: "pending",
        createdAt: new Date().getTime(),
      });

      return res.status(200).json({
        success: true,
        message: "Success! Now wait for the approval of your deposit.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops, an error occurred.",
      });
    }
  }

  if (req.method === "GET") {
    const q = query(
      dbInstancesUsersFinances,
      where("userId", "==", user),
      orderBy("createdAt", "desc")
    );
    const queryResult = await getDocs(q);

    const data = queryResult.docs.map((doc) => {
      const { url, amount, status, createdAt } = doc.data();

      return {
        url,
        amount,
        status,
        createdAt,
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
  }
};
