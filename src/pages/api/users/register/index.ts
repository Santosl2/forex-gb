/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable unused-imports/no-unused-vars */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";
import { SignUpFormData } from "@/shared/interfaces/Forms";
import { registerSchema } from "@/shared/schemas/register";
import { auth, dbInstanceUsers } from "@/shared/services/firebase";
import { verifyCaptcha } from "@/shared/services/requests/captcha";
import { hashPassword } from "@/shared/utils/hash";

import guestMiddleware from "../../middlewares/guestMiddleware";

export default async (req: CustomRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await guestMiddleware(req, res);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { username, email, password, confirmPassword, captchaToken } =
      req.body as SignUpFormData;

    try {
      await registerSchema.validate({
        username,
        email,
        password,
        confirmPassword,
      });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e.errors[0] });
    }

    const validCaptcha = await verifyCaptcha(
      captchaToken,
      process.env.RECAPTCHA_SECRET_KEY ?? ""
    );

    if (!validCaptcha.data.success) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid recaptcha" });
    }

    const queryEmail = query(dbInstanceUsers, where("email", "==", email));
    const queryResult = await getDocs(queryEmail);

    if (queryResult.size > 0) {
      return res
        .status(400)
        .json({ success: false, message: "E-mail already in use" });
    }

    const queryUser = query(dbInstanceUsers, where("username", "==", username));
    const queryResultUser = await getDocs(queryUser);

    if (queryResultUser.size > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Username already in use" });
    }

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const hashedPassword = await hashPassword(password);
      const userId = createUser.user.uid;
      addDoc(dbInstanceUsers, {
        id: userId,
        name: username,
        email,
        password: hashedPassword,
        isAdmin: false,
        createdAt: new Date().getTime(),
      });

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error when try to register",
      });
    }
  }

  res.setHeader("Allow", "POST");
  res.status(405).end("Method not allowed");
};
