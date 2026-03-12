import './Button.css';

function Button ({onClick : onResetHandler}) {
    return (
        <button className="resetBtn" onClick={onResetHandler}>
            리셋
        </button>
    )
}

export default Button