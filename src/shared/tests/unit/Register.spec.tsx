import { RegisterForm } from "@/components/templates";
import { render, screen } from "@testing-library/react";

describe("Register Component", () => {
  it("should be render correctly", () => {
    render(<RegisterForm />);

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
});
