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
  isAdmin: boolean;
  accessToken: string;
  refreshToken: string;
  walletId: string;
};

export type UserCustom = UserCredential &
  UserFirebaseType & {
    accessToken: string;
  };
