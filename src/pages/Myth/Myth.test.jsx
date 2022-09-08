import Myth from "./Myth";
import { render } from "@testing-library/react";

it("Should render the Myth page", () => {
  const container = render(<Myth />)

  expect(container).toMatchSnapshot();
});