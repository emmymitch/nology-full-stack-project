import Delete from "./Delete";
import { render } from "@testing-library/react";

it("Should render the Delete page", () => {
  const container = render(<Delete />)

  expect(container).toMatchSnapshot();
});