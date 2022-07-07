import { createMocks } from "node-mocks-http";
import registerAPI from "@/pages/api/users/register";

import axios from "axios";

jest.mock("axios");

const mockRegisterEmails = ["teste@gmail.com"];
const mockRegisterUsers = ["macacoo"];

jest.mock("firebase/auth", () => ({
  getAuth: () => true,
  signInWithEmailAndPassword: () => ({
    user: {
      accessToken: "654321",
      refreshToken: "123456",
    },
  }),
  sendEmailVerification: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 1000);
    });
  },
  createUserWithEmailAndPassword: () => ({
    user: {
      uid: "123",
    },
  }),
}));

jest.mock("firebase/firestore", () => ({
  addDoc: () => true,
  query: (e: string, email: string) => email,
  getDocs: (data: string) => ({
    size:
      mockRegisterEmails.find((e) => e === data)?.length ||
      mockRegisterUsers.find((e) => e === data)?.length,
  }),
  where: (column: string, operator: string, mail: string) => mail,
  getFirestore: () => true,
  collection: () => true,
}));

const mockHashPassword = jest.spyOn(
  require("../../../utils/hash"),
  "hashPassword"
);

describe("[API] Login ", () => {
  const testLong = "teste".repeat(10); // 50
  it.todo("should be able to login user");
});
