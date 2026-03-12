function Form({ currency, value, onChange: onChangeHandler }) {
  return (
    <div>
      <span>{currency}: </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChangeHandler(currency, event.target.value)}
      />
    </div>
  );
}

export default Form;
