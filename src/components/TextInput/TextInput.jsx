import "./TextInput.scss";

const TextInput = ({name, className = "", placeholder, onBlur}) => {
    return (
        <input 
            type="text" 
            className={"text-input " + className}
            name={name} 
            placeholder={placeholder} 
            defaultValue=""
            onBlur={onBlur}
        />
    )
}

export default TextInput;