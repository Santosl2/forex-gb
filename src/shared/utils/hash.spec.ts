import { hashPassword, verifyPassword } from "./hash";

jest.mock("bcryptjs", () => ({
  hash: () => "hashedPassword",
  compare: () => true,
}));

describe("Hash Utils", () => {
  const passwordToHash = "123456";

  it("should be to hash password", () => {
    expect(hashPassword(passwordToHash)).toBe("hashedPassword");
  });

  it("should be to hash password", () => {
    expect(verifyPassword(passwordToHash, "hashedPassword")).toBe(true);
  });
});
