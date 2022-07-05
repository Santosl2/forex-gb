import { createMocks } from "node-mocks-http";
import registerAPI from "@/pages/api/users/register";

let size = 1;
jest.mock("firebase/auth", () => ({
  getAuth: () => true,
  createUserWithEmailAndPassword: () => ({
    user: {
      uid: "123",
    },
  }),
}));

jest.mock("firebase/firestore", () => ({
  addDoc: () => true,
  query: () => true,
  getDocs: () => ({
    size,
  }),
  where: () => true,
  getFirestore: () => true,
  collection: () => true,
}));

const mockHashPassword = jest.spyOn(
  require("../../../utils/hash"),
  "hashPassword"
);

describe("[API] Register ", () => {
  const testLong = "teste".repeat(10); // 50

  it("should NOT be able to register user when fields are empty", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should NOT be able to register user when password is very easy", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "abc789",
        email: "teste@gmail.com",
        password: "123456",
        confirmPassword: "123456",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe(
      "Password must contain at least 6 characters, one uppercase, one number and one special case character"
    );
  });

  it("should NOT be able to register user when password is too long", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "abc789",
        email: "teste@gmail.com",
        password: testLong,
        confirmPassword: testLong,
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe("Password must be less than 30 characters");
  });

  it("should NOT be able to register user when password is too short", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "a",
        email: "teste@gmail.com",
        password: "1234",
        confirmPassword: "1234",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe("Use 6 characters or more for your password");
  });

  it("should NOT be able to register user when confirm password doesnt match password", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "abc789",
        email: "teste@gmail.com",
        password: "biro@Biro1",
        confirmPassword: "birbo@Biro1",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe("Those passwords didn’t match. Try again.");
  });

  it("should NOT be able to register user when username is too short", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "a",
        email: "teste@gmail.com",
        password: "1234@Az",
        confirmPassword: "1234@Az",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe("Use 3 characters or more for your username");
  });

  it("should NOT be able to register user when username is too long", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: testLong,
        email: "teste@gmail.com",
        password: "1234@Az",
        confirmPassword: "1234@Az",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe("Username must be less than 24 characters");
  });

  it("should NOT be able to register user when username contains special characters", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "macacoo!!$",
        email: "teste@gmail.com",
        password: "1234@Az",
        confirmPassword: "1234@Az",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe(
      "Don't use special character in your username."
    );
  });

  it("should NOT be able to register user when email is invalid", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "macacoo",
        email: "teste@",
        password: "1234@Az",
        confirmPassword: "1234@Az",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe("Please insert a valid e-mail");
  });

  it("should NOT be able to register user when email is already in use", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "macacoo",
        email: "teste@gmail.com",
        password: "1234@Az",
        confirmPassword: "1234@Az",
      },
    });

    await registerAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: false,
        message: "E-mail already in use",
      })
    );
  });

  it("should be able to register user", async () => {
    size = 0;
    const { req, res } = createMocks({
      method: "POST",
      body: {
        username: "macacoo",
        email: "teste@gmail.com",
        password: "1234@Az",
        confirmPassword: "1234@Az",
      },
    });

    await registerAPI(req, res);

    expect(mockHashPassword).toBeCalledWith("1234@Az");
    expect(res._getStatusCode()).toBe(201);
    expect(res._getData()).toBe(
      JSON.stringify({
        success: true,
      })
    );
  });
});
