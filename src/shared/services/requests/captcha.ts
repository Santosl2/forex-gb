import axios from "axios";

export async function verifyCaptcha(token: string, secret: string) {
  return axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );
}
