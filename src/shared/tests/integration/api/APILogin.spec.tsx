import { createMocks } from "node-mocks-http";
import loginAPI from "@/pages/api/users/login";

import { SignInFormData } from "@/shared/interfaces/Forms";

jest.mock("axios");

const mockedSuccessUser = [
  {
    email: "teste@gmail.com",
    password: "J3sus2022",
    name: "J3sus",
    email_verified: true,
  },
  {
    email: "teste1@gmail.com",
    password: "J3sus2022",
    name: "J3sus",
    email_verified: false,
  },
];

jest.mock("firebase/auth", () => ({
  getAuth: () => true,
  signInWithEmailAndPassword: (i: string, email: string) => ({
    user: {
      accessToken: "654321",
      refreshToken: "123456",
      emailVerified: mockedSuccessUser.find((user) => user.email === email)
        ?.email_verified,
    },
  }),
}));

jest.mock("firebase/firestore", () => ({
  addDoc: () => true,
  query: (e: string, email: string) => email,
  getDocs: (data: SignInFormData) => ({
    docs: [
      {
        data: () => ({
          id: 1,
          email: mockedSuccessUser[0].email,
          password: mockedSuccessUser[0].password,
          name: mockedSuccessUser[0].name,
        }),
      },
    ],

    size: mockedSuccessUser.filter((e) => e.email === data.email)?.length || 0,
  }),
  where: (column: string, operator: string, email: string) => ({
    email,
  }),
  getFirestore: () => true,
  collection: () => true,
}));

const mockHashPassword = jest.spyOn(
  require("../../../utils/hash"),
  "verifyPassword"
);

describe("[API] Login ", () => {
  beforeAll(() => {
    mockHashPassword.mockImplementation(() => true);
  });

  afterEach(() => {
    mockHashPassword.mockClear();
  });

  it("should NOT be able to login user when email is empty", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "",
        password: "teste",
      },
    });

    await loginAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: false,
        message: "E-mail is required",
      })
    );
  });

  it("should NOT be able to login user when email is invalid", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "mf",
        password: "teste",
      },
    });

    await loginAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: false,
        message: "Please insert a valid e-mail",
      })
    );
  });

  it("should NOT be able to login user when password is empty", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "mf@gmail.com",
        password: "",
      },
    });

    await loginAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: false,
        message: "Password is required",
      })
    );
  });

  it("should NOT be able to login when user not exists", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "mf@gmail.com",
        password: "J3sus@",
      },
    });

    await loginAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: false,
        message: "Invalid credentials",
      })
    );
  });

  it("should NOT be able to login user when user credentials is invalid", async () => {
    mockHashPassword.mockImplementation(() => false);
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "teste@gmail.com",
        password: "J3sus2022",
      },
    });

    await loginAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: false,
        message: "Invalid credentials",
      })
    );
  });

  it("should NOT be able to login user when user not mail verified", async () => {
    const { email, password } = mockedSuccessUser[1];

    mockHashPassword.mockImplementation(() => true);

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email,
        password,
      },
    });

    await loginAPI(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: false,
        message:
          "Your email is not verified, please verify your email to login.",
      })
    );
  });

  it("should be able to login user ", async () => {
    const { email, password, name } = mockedSuccessUser[0];

    mockHashPassword.mockImplementation(() => true);

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email,
        password,
      },
    });

    await loginAPI(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: true,
        user: {
          id: 1,
          name,
          email,
        },
        refreshToken: "123456",
        accessToken: "654321",
      })
    );
  });
});
