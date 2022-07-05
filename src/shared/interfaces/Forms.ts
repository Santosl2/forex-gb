export type SignInFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  captchaToken: string;
};
