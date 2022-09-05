import "./Button.scss";

const Button = ({className, type, onClick, text}) => {
    return (
        <button className={"button "+ className} type={type} onClick={onClick}>{text}</button>
    )
}

export default Button;