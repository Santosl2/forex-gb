import { yup } from "@/shared/utils/yup";

export const registerSchema = yup
  .object({
    email: yup
      .string()
      .email("Please insert a valid e-mail")
      .required("E-mail is required"),
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Use 3 characters or more for your username")
      .max(24, "Username must be less than 24 characters")
      .matches(
        /^[\w\s.-]+$/gi,
        "Don't use special character in your username."
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Use 6 characters or more for your password")
      .max(30, "Password must be less than 30 characters")
      .matches(
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/gm,
        "Password must contain at least 6 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Those passwords didn’t match. Try again."),
  })
  .required();
