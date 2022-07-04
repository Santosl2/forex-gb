import { classNames } from "./classNames";

describe("ClassNames utils", () => {
  let classToAdd = {};

  beforeAll(() => {
    classToAdd = {
      "is-loading": true,
      "is-disabled": true,
      "is-active": true,
    };
  });

  afterAll(() => {
    classToAdd = {};
  });

  it("should be return correctly classNames when value is true", () => {
    expect(classNames(classToAdd)).toBe("is-loading is-disabled is-active");
  });

  it("should be return correctly classNames when value is false", () => {
    classToAdd = {
      ...classToAdd,
      "is-active": false,
    };
    expect(classNames(classToAdd)).toBe("is-loading is-disabled");
  });
});
