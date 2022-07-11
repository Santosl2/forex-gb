/* eslint-disable consistent-return */
import { addDoc } from "firebase/firestore";
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
  if (req.method === "POST") {
    try {
      await authMiddleware(req, res);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

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

    const { user } = req;

    try {
      const data = await uploadFile(voucherFile, "data_url");

      addDoc(dbInstancesUsersFinances, {
        userId: user,
        url: data,
        amount,
        approved: false,
        createAt: new Date().getTime(),
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

  res.setHeader("Allow", "POST");
  res.status(405).end("Method not allowed");
};
