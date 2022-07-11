/* eslint-disable consistent-return */
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { NextApiResponse } from "next";

import { CustomRequest } from "@/shared/interfaces/Common";
import { SignInFormData } from "@/shared/interfaces/Forms";
import { UserType } from "@/shared/interfaces/User";
import { loginSchema } from "@/shared/schemas/login";
import { auth, dbInstanceUsers } from "@/shared/services/firebase";
import { jwtGenerate } from "@/shared/utils/auth/JWT";
import { verifyPassword } from "@/shared/utils/hash";

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
    const { email, password } = req.body as SignInFormData;

    try {
      await loginSchema.validate({
        email,
        password,
      });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e.errors[0] });
    }

    const q = query(dbInstanceUsers, where("email", "==", email));
    const queryResult = await getDocs(q);

    if (queryResult.size === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const doc = queryResult.docs[0];

    try {
      const { password: userPassword, name, id } = doc.data();
      const verifyUserPassword = await verifyPassword(password, userPassword);

      if (!verifyUserPassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const {
        user: { emailVerified },
      } = (await signInWithEmailAndPassword(auth, email, password)) as UserType;

      if (!emailVerified) {
        return res.json({
          success: false,
          message:
            "Your email is not verified, please verify your email to login.",
        });
      }

      await auth.signOut();

      const token = jwtGenerate(id.toString());

      return res.json({
        success: true,
        user: {
          id,
          name,
          email,
        },
        refreshToken: token,
        accessToken: token,
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
