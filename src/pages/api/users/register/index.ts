/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable unused-imports/no-unused-vars */
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { SignUpFormData } from "@/shared/interfaces/Forms";
import { UserType } from "@/shared/interfaces/User";
import { registerSchema } from "@/shared/schemas/register";
import { verifyCaptcha } from "@/shared/services/auth/captcha";
import { auth, dbInstanceUsers } from "@/shared/services/firebase";
import { hashPassword } from "@/shared/utils/hash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
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
        username,
        email,
        password: hashedPassword,
        verifiedMail: false,
      });

      const {
        user: { refreshToken, accessToken },
      } = (await signInWithEmailAndPassword(auth, email, password)) as UserType;

      const currentUser = auth.currentUser ?? ({} as User);

      sendEmailVerification(currentUser).then(async () => {
        console.log(`E-mail sent successfuly to ${email}`);
        await auth.signOut();
      });

      return res.status(201).json({
        success: true,
        user: {
          id: userId,
          name: username,
          email,
        },
        refreshToken,
        accessToken,
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
