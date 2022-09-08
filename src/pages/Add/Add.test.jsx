import Add from "./Add";
import { render } from "@testing-library/react";

it("Should render the Add page", () => {
  const container = render(<Add />)

  expect(container).toMatchSnapshot();
});