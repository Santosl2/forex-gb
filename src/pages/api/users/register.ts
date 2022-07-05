/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable unused-imports/no-unused-vars */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { SignUpFormData } from "@/shared/interfaces/Forms";
import { registerSchema } from "@/shared/schemas/register";
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
      return res.status(400).send(e.errors[0]);
    }

    const q = query(dbInstanceUsers, where("email", "==", email));
    const queryResult = await getDocs(q);

    if (queryResult.size > 0) {
      return res
        .status(400)
        .json({ success: false, message: "E-mail already in use" });
    }

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const hashedPassword = await hashPassword(password);

      addDoc(dbInstanceUsers, {
        id: createUser.user.uid,
        username,
        email,
        password: hashedPassword,
        authProvider: "local",
      });

      return res.status(201).json({ success: true });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error when try to register",
      });
    }
  }

  res.setHeader("Allow", "POST");
  res.status(405).end("Method not allowed");
};
