import "./Dropdown.scss";

const Dropdown = ({className, name, onChange = null}) => {
    return (
        <select className={className} name={name} onChange={onChange}>
            <option value="englishName">English Name</option>
            <option value="greekName">Greek Name</option>
            <option value="majorDomains">Major Domains</option>
            <option value="identifiers">Identifiers</option>
            <option value="description">Description</option>
        </select>
    )
}

export default Dropdown;