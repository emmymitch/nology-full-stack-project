import View from "./View";
import { render } from "@testing-library/react";

it("Should render the View page", () => {
  const container = render(<View />)

  expect(container).toMatchSnapshot();
});