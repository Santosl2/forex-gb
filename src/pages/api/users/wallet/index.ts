/* eslint-disable consistent-return */
import { doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { ModalUpdateUserWalletFormData } from "@/components/organims/ModalUpdateUserWallet/ModalUpdateUserWallet.types";
import { CustomRequest } from "@/shared/interfaces/Common";
import { modalUpdateWalletSchema } from "@/shared/schemas/modal";
import { dbInstanceUsers } from "@/shared/services/firebase";

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

  const q = query(dbInstanceUsers, where("id", "==", user));
  const queryResult = await getDocs(q);

  if (req.method === "POST") {
    const { walletAddress } = req.body as ModalUpdateUserWalletFormData;

    try {
      await modalUpdateWalletSchema.validate({
        walletAddress,
      });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    try {
      const docId = queryResult.docs[0].id;
      await updateDoc(doc(dbInstanceUsers, docId), {
        walletId: walletAddress,
      });

      return res.status(200).json({
        success: true,
        message: "Success! Your wallet has been updated.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Oops, an error occurred.",
      });
    }
  }
};
