import { jwtGenerate } from "./JWT";

jest.mock("jsonwebtoken", () => ({
  sign: () => "generate",
}));

describe("JWT Utils", () => {
  it("should be to generate JWT", () => {
    expect(jwtGenerate("123456")).toEqual("generate");
  });
});
