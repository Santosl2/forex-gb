/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from "next";

import { SignInFormData } from "@/shared/interfaces/Forms";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body as Pick<SignInFormData, "email">;
  }
};
