import './Button.css'

function Button({className, text, onClick}) {
  return (
    <button className={`Button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;