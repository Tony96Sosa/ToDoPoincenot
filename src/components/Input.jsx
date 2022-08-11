const Input = ({ value, setValue }) => {
  return (
    <input
      className="input"
      type="text"
      value={value}
      placeholder="Escribí un item"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
