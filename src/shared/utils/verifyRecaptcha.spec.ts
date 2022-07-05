import { waitFor } from "@testing-library/react";
import { CustomWindowType } from "../interfaces/Window";
import { verifyRecaptcha } from "./verifyRecaptcha";

describe("Verify Recaptcha Utils", () => {
  let mockReady = jest.fn(async (e) => {
    const resolvePromise = await Promise.resolve(e()).then((msg) => msg);

    return resolvePromise;
  });

  beforeAll(() => {
    const customWindow = window as any as CustomWindowType;
    customWindow.grecaptcha = {
      ready: mockReady,
      execute: async () => "recaptcha-token",
    };
  });

  it("should be verify Recaptcha", async () => {
    verifyRecaptcha();

    expect(mockReady).toHaveBeenCalled();
  });
});
