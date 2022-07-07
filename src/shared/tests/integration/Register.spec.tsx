import { RegisterForm } from "@/components/templates";
import { CustomWindowType } from "@/shared/interfaces/Window";
import { fireEvent, screen } from "@testing-library/react";
import { customRender } from "../utils/customRender";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");

const mockMutation = jest.spyOn(
  require("../../hooks/useMutation"),
  "useMutationRegisterUser"
);

describe("Register Component", () => {
  let mockPost = jest.fn();
  let pushRouteMock = jest.fn();
  let mockReady = jest.fn(async (e) => {
    const resolvePromise = await Promise.resolve(e()).then((msg) => msg);

    return resolvePromise;
  });

  beforeEach(() => {
    const customWindow = window as any as CustomWindowType;
    customWindow.grecaptcha = {
      ready: mockReady,
      execute: async () => "123456",
    };

    mockPost = jest.fn().mockReturnValue({
      data: {
        success: true,
      },
    });

    axios.post = mockPost;
  });

  afterEach(() => {
    (axios.post as jest.Mock).mockClear();
  });

  it("should be customRender correctly", () => {
    customRender(<RegisterForm />);

    const inputEmail = screen.getByText("E-mail");
    const inputUsername = screen.getByText("Username");
    const inputPassword = screen.getByText("Password");
    const inputConfirmPassword = screen.getByText("Confirm Password");
    const btnRegister = screen.getByText("Register");
    const btnBack = screen.getByText("Sign in instead");

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputConfirmPassword).toBeInTheDocument();
    expect(inputUsername).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
    expect(btnBack).toBeInTheDocument();
  });

  it("should NOT be able to register user when fields are empty", async () => {
    customRender(<RegisterForm />);

    const btnRegister = screen.getByText("Register");

    fireEvent.click(btnRegister);

    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("E-mail is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Confirm password is required")
    ).toBeInTheDocument();
  });

  it("should NOT be able to register user when username and password is too short", async () => {
    customRender(<RegisterForm />);

    const inputEmail = screen.getByTestId("email");
    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const inputConfirmPassword = screen.getByTestId("confirmPassword");
    const btnRegister = screen.getByText("Register");

    fireEvent.change(inputUsername, { target: { value: "a" } });
    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "1234" } });
    fireEvent.change(inputConfirmPassword, { target: { value: "1234" } });

    fireEvent.click(btnRegister);

    expect(
      await screen.findByText("Use 3 characters or more for your username")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Use 6 characters or more for your password")
    ).toBeInTheDocument();
  });

  it("should NOT be able to register user when password is very easy", async () => {
    customRender(<RegisterForm />);

    const inputEmail = screen.getByTestId("email");
    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const inputConfirmPassword = screen.getByTestId("confirmPassword");
    const btnRegister = screen.getByText("Register");

    fireEvent.change(inputUsername, { target: { value: "teste" } });
    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "123456" } });
    fireEvent.change(inputConfirmPassword, { target: { value: "123456" } });

    fireEvent.click(btnRegister);

    expect(
      await screen.findByText(
        "Password must contain at least 6 characters, one uppercase, one number and one special case character"
      )
    ).toBeInTheDocument();
  });

  it("should NOT be able to register user when confirm password doesnt match password", async () => {
    customRender(<RegisterForm />);

    const inputEmail = screen.getByTestId("email");
    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const inputConfirmPassword = screen.getByTestId("confirmPassword");
    const btnRegister = screen.getByText("Register");

    fireEvent.change(inputUsername, { target: { value: "teste" } });
    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "a123456A@" } });
    fireEvent.change(inputConfirmPassword, { target: { value: "a123456" } });

    fireEvent.click(btnRegister);

    expect(
      await screen.findByText("Those passwords didn’t match. Try again.")
    ).toBeInTheDocument();
  });

  it("should NOT be able to register user when username contains special characters", async () => {
    customRender(<RegisterForm />);

    const inputEmail = screen.getByTestId("email");
    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const inputConfirmPassword = screen.getByTestId("confirmPassword");
    const btnRegister = screen.getByText("Register");

    fireEvent.change(inputUsername, { target: { value: "testelofi#@!&" } });
    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "123456" } });
    fireEvent.change(inputConfirmPassword, { target: { value: "123456" } });

    fireEvent.click(btnRegister);

    expect(
      await screen.findByText("Don't use special character in your username.")
    ).toBeInTheDocument();
  });

  it("should NOT be able to register user when password and username is too long", async () => {
    customRender(<RegisterForm />);

    const inputEmail = screen.getByTestId("email");
    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const inputConfirmPassword = screen.getByTestId("confirmPassword");
    const btnRegister = screen.getByText("Register");

    const testLongUsername = "teste".repeat(10); // 50
    const testLongPassword = "teste".repeat(10); // 50

    fireEvent.change(inputUsername, { target: { value: testLongUsername } });
    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: testLongPassword } });
    fireEvent.change(inputConfirmPassword, {
      target: { value: testLongPassword },
    });

    fireEvent.click(btnRegister);

    expect(
      await screen.findByText("Password must be less than 30 characters")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Username must be less than 24 characters")
    ).toBeInTheDocument();
  });

  it("should NOT be able to register user when user already exists", async () => {
    const error = {
      success: false,
      message: "Username already in use",
    };

    const mockPostUser = jest.fn().mockRejectedValue(error);

    axios.post = mockPostUser;

    mockMutation.mockImplementation(() => ({
      isLoading: false,
      mutateAsync: async () =>
        Promise.reject({
          response: {
            data: {
              message: error.message,
            },
          },
        }),
    }));

    customRender(<RegisterForm />);

    const inputEmail = screen.getByTestId("email");
    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const inputConfirmPassword = screen.getByTestId("confirmPassword");
    const btnRegister = screen.getByText("Register");

    fireEvent.change(inputUsername, { target: { value: "teste" } });
    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "Teste@123" } });
    fireEvent.change(inputConfirmPassword, {
      target: { value: "Teste@123" },
    });

    await act(async () => {
      fireEvent.click(btnRegister);
    });

    expect(pushRouteMock).not.toHaveBeenCalled();

    expect(
      await screen.findByText("Username already in use")
    ).toBeInTheDocument();
  });

  it("should NOT be able to register user when email already exists", async () => {
    const error = {
      success: false,
      message: "E-mail already in use",
    };

    const mockPostUser = jest.fn().mockRejectedValue(error);

    axios.post = mockPostUser;

    mockMutation.mockImplementation(() => ({
      isLoading: false,
      mutateAsync: async () =>
        Promise.reject({
          response: {
            data: {
              message: error.message,
            },
          },
        }),
    }));

    customRender(<RegisterForm />);

    const inputEmail = screen.getByTestId("email");
    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const inputConfirmPassword = screen.getByTestId("confirmPassword");
    const btnRegister = screen.getByText("Register");

    fireEvent.change(inputUsername, { target: { value: "teste" } });
    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "Teste@123" } });
    fireEvent.change(inputConfirmPassword, {
      target: { value: "Teste@123" },
    });

    await act(async () => {
      fireEvent.click(btnRegister);
    });

    expect(pushRouteMock).not.toHaveBeenCalled();

    expect(
      await screen.findByText("E-mail already in use")
    ).toBeInTheDocument();
  });

  it("should be able to register user and send to verify email page", async () => {
    const mutateMock = jest.fn(() => ({
      success: true,
    }));

    mockMutation.mockImplementation(() => ({
      isLoading: false,
      mutateAsync: mutateMock,
    }));

    customRender(<RegisterForm />);

    const inputEmail = screen.getByTestId("email");
    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const inputConfirmPassword = screen.getByTestId("confirmPassword");
    const btnRegister = screen.getByText("Register");

    fireEvent.change(inputUsername, { target: { value: "teste" } });
    fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "Teste@123" } });
    fireEvent.change(inputConfirmPassword, {
      target: { value: "Teste@123" },
    });

    await act(async () => {
      fireEvent.click(btnRegister);
    });

    expect(mockPost().data.success).toBe(true);
    expect(screen.getByText("Check your inbox!")).toBeInTheDocument();
  });
});
