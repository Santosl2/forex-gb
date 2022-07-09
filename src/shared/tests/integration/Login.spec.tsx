import { LoginForm } from "@/components/templates";
import { UserData } from "@/shared/interfaces/User";
import { fireEvent, screen } from "@testing-library/react";

import { act } from "react-dom/test-utils";
import { customRender } from "../utils/customRender";

jest.mock("axios");

function render() {
  const { mockStore } = customRender(<LoginForm />);

  return { mockStore };
}

const mockUseUser = jest.spyOn(require("../../hooks/useUser"), "useUserLogin");

const mockMutation = jest.spyOn(
  require("../../hooks/useMutation"),
  "useMutationLoginUser"
);

const mockRouter = jest.spyOn(require("next/router"), "useRouter");

describe("Login Component", () => {
  let mockPush = jest.fn();
  beforeEach(() => {
    mockRouter.mockImplementation(() => ({
      push: mockPush,
      prefetch: async () => true,
    }));

    mockMutation.mockImplementation(() => ({
      isLoading: false,
      mutateAsync: () => ({
        message: "Invalid email or password",
      }),
    }));

    mockUseUser.mockImplementation(() => (f: UserData) => {
      return f;
    });
  });

  afterEach(() => {
    mockMutation.mockClear();
  });

  it("should be render correctly", () => {
    render();

    const inputEmail = screen.getByText("E-mail");
    const inputPassword = screen.getByText("Password");

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  it("should NOT be able to login when fields are empty", async () => {
    render();

    const loginButton = screen.getByText("Login");

    fireEvent.click(loginButton);

    expect(await screen.findByText("E-mail is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("should NOT be able to login when email is invalid", async () => {
    render();

    const inputEmail = screen.getByTestId("emailTest");
    const loginButton = screen.getByText("Login");

    fireEvent.change(inputEmail, { target: { value: "teste@g" } });

    fireEvent.click(loginButton);

    expect(
      await screen.findByText("Please insert a valid e-mail")
    ).toBeInTheDocument();
  });

  it("should NOT be able to login user when credentials is invalid", async () => {
    render();

    const inputEmail = screen.getByTestId("emailTest");
    const inputPassword = screen.getByTestId("passwordTest");
    const loginButton = screen.getByText("Login");

    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "M@theus1478" } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(mockMutation).toHaveBeenCalled();

    expect(
      await screen.findByText("Invalid email or password")
    ).toBeInTheDocument();
  });

  it("should NOT be able to login user when email is not verified", async () => {
    mockMutation.mockImplementation(() => ({
      isLoading: false,
      mutateAsync: () => ({
        message:
          "Your email is not verified, please verify your email to login.",
      }),
    }));

    render();

    const inputEmail = screen.getByTestId("emailTest") as HTMLInputElement;
    const inputPassword = screen.getByTestId(
      "passwordTest"
    ) as HTMLInputElement;
    const loginButton = screen.getByText("Login");

    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "M@theus1478" } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(mockMutation).toHaveBeenCalled();
    expect(
      await screen.findByText(
        "Your email is not verified, please verify your email to login."
      )
    ).toBeInTheDocument();
    expect(inputPassword.value).toBe("");
    expect(inputEmail.value).toBe("");
  });

  it("should be able to login user", async () => {
    mockMutation.mockImplementation(() => ({
      isLoading: false,
      mutateAsync: () => ({
        success: true,
        message: "Login successful!",
        user: {
          id: "1",
          name: "Teste",
          email: "teste@gmail.com",
        },
        accessToken: "f",
        refreshToken: "f",
      }),
    }));

    render();

    const inputEmail = screen.getByTestId("emailTest") as HTMLInputElement;
    const inputPassword = screen.getByTestId(
      "passwordTest"
    ) as HTMLInputElement;
    const loginButton = screen.getByText("Login");

    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "M@theus1478" } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(mockMutation).toHaveBeenCalled();
    expect(await screen.findByText("Login successful!")).toBeInTheDocument();
    expect(inputPassword.value).toBe("");
    expect(inputEmail.value).toBe("");
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});
