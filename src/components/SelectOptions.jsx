import Arrow from '../assets/Vector.svg';

const SelectOptions = ({ setOpen, open, selectOption, handleSelect }) => {
  const options = ['Todos', 'Realizados', 'No Realizados'];
  return (
    <>
      <div onClick={() => setOpen(!open)} className="selectbox">
        {selectOption} <img src={Arrow} alt="arrow" className="arrow" />
      </div>
      {open && (
        <div className="options-box">
          {options.map((option) => {
            return (
              <div
                key={option}
                className={`select-options ${option === selectOption}`}
                onClick={handleSelect}>
                {option}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SelectOptions;
