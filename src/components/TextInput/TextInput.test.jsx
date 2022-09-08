import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from "./TextInput";

let textTest = "";
const TestSearch = () => {
    const changeSearch = (event) => {return textTest = event.target.value};
    return <TextInput onChange={changeSearch} />
}

it("Should render text input", () => {
    const container = render(<TestSearch />);

    const textInput = screen.getByRole('textbox');

    expect(textInput).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});

it("Should update variable with input", () => {
    render(<TestSearch />);

    const box = screen.getByRole('textbox');
    userEvent.type(box, "this is a search");

    expect(textTest).toBe("this is a search");
})