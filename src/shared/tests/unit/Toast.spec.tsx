import { Toast } from "@/components/molecules";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Toast Tests", () => {
  it("should be render correctly", () => {
    render(<Toast type="success">Teste</Toast>);

    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  it("should be close toast when click in close button", () => {
    render(<Toast type="success">Teste</Toast>);

    const closeBtn = screen.getByLabelText("Close");

    fireEvent.click(closeBtn);

    expect(screen.queryByText("Teste")).not.toBeInTheDocument();
  });

  it("should be to appear correctly SVG", () => {
    const { rerender } = render(<Toast type="success">Teste</Toast>);

    const successSVG = screen.getByTestId("successSvg");

    expect(successSVG).toBeInTheDocument();

    rerender(<Toast type="error">Teste</Toast>);

    const errorSVG = screen.getByTestId("errorSvg");
    expect(errorSVG).toBeInTheDocument();

    rerender(<Toast type="info">Teste</Toast>);

    const infoSVG = screen.getByTestId("infoSvg");
    expect(infoSVG).toBeInTheDocument();
  });
});
