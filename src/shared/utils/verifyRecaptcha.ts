/* eslint-disable no-new */
import { CAPTCHA_CLIENT_KEY } from "../constants";
import { CustomWindowType } from "../interfaces/Window";

export async function verifyRecaptcha(): Promise<string> {
  const customWindow = window as any as CustomWindowType;
  let token = "";

  await new Promise((resolve) => {
    customWindow?.grecaptcha.ready(async () => {
      token = await customWindow.grecaptcha.execute(CAPTCHA_CLIENT_KEY, {
        action: "submit",
      });

      resolve(token);
    });
  });

  return token;
}
