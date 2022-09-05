import "./Button.scss";

const Button = ({className = "", type = "button", onClick, text, disabled = false}) => {
    return (
        <button 
            className={"button "+ className} 
            type={type} 
            onClick={onClick}
            disabled={disabled}
            
            >{text}
        </button>
    )
}

export default Button;