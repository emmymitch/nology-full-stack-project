import "./TextInput.scss";

const TextInput = ({name, className = "", placeholder = "", onBlur = null, onChange = null}) => {
    return (
        <input 
            type="text" 
            className={"text-input " + className}
            name={name} 
            placeholder={placeholder} 
            defaultValue=""
            onBlur={onBlur}
            onChange={onChange}
        />
    )
}

export default TextInput;