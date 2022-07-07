import { Toast } from "@/components/molecules";
import {
  fireEvent,
  screen,
  render as initialRender,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { customRender, testStore } from "../utils/customRender";

function render() {
  const { mockStore, rerenderWithRedux } = customRender(
    <Toast type="success" message="Teste" id={1} />,

    {}
  );

  return { mockStore, rerenderWithRedux };
}

describe("Toast Tests", () => {
  it("should be render correctly", () => {
    render();

    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  it("should be close toast when click in close button", () => {
    render();

    const closeBtn = screen.getByLabelText("Close");

    fireEvent.click(closeBtn);

    expect(screen.queryByText("Teste")).not.toBeInTheDocument();
  });

  it("should be to appear correctly SVG", () => {
    const { rerender } = initialRender(
      <Provider store={testStore({})}>
        <Toast type="success" message="teste" id={1} />
      </Provider>
    );

    const successSVG = screen.getByTestId("successSvg");

    expect(successSVG).toBeInTheDocument();

    rerender(
      <Provider store={testStore({})}>
        <Toast type="error" message="teste" id={1} />
      </Provider>
    );

    const errorSVG = screen.getByTestId("errorSvg");
    expect(errorSVG).toBeInTheDocument();

    rerender(
      <Provider store={testStore({})}>
        <Toast type="info" message="teste" id={1} />
      </Provider>
    );

    const infoSVG = screen.getByTestId("infoSvg");
    expect(infoSVG).toBeInTheDocument();
  });
});
