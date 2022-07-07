import { LoginForm } from "@/components/templates";
import { fireEvent, screen } from "@testing-library/react";
import { customRender } from "../utils/customRender";

function render() {
  const { mockStore } = customRender(<LoginForm />);

  return { mockStore };
}

describe("Login Component", () => {
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

  //   it("should be able to login user", async () => {
  //     render();

  //     const inputEmail = screen.getByTestId("emailTest");
  //     const inputPassword = screen.getByTestId("passwordTest");
  //     const loginButton = screen.getByText("Login");

  //     fireEvent.change(inputEmail, { target: { value: "teste@gmail.com" } });
  //     fireEvent.change(inputPassword, { target: { value: "M@theus1478" } });

  //     fireEvent.click(loginButton);

  //     expect(
  //       await screen.findByText("Welcome to Black Capital!")
  //     ).toBeInTheDocument();
  //   });
});
