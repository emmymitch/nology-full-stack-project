import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from "./Dropdown";

let dropdownValue = "";

const TestDropdownMenu = () => {
    const testDropdown = () => {return dropdownValue = event.target.value};
    return <Dropdown onChange={testDropdown} />
}

it("Should render dropdown", () => {
    const container = render(<TestDropdownMenu />);

    const sortInput = screen.getByRole('combobox');
    const sortOptions = screen.getAllByRole('option');

    expect(sortInput).toBeInTheDocument();

    sortOptions.forEach((option) => {
        expect(option).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
});

it("Should update variable on selection", () => {
    render(<TestDropdownMenu />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'English Name');
    
    expect(dropdownValue).toStrictEqual("englishName");
});