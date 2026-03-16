function ConverterForm({ currency, value, onChange: onChangeHandler }) {
  return (
    <div>
      <span>{currency}: </span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChangeHandler(currency, event.target.value)}
      />
    </div>
  );
}

export default ConverterForm;
