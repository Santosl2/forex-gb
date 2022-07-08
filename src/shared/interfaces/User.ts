import { UserCredential, User as UserFirebaseType } from "firebase/auth";

export type UserType = UserCredential & {
  user: UserFirebaseType & {
    accessToken: string;
  };
};

export type UserData = {
  id?: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export type UserCustom = UserCredential &
  UserFirebaseType & {
    accessToken: string;
  };
