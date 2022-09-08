import Update from "./Update";
import { render } from "@testing-library/react";

it("Should render the Update page", () => {
  const container = render(<Update />)

  expect(container).toMatchSnapshot();
});