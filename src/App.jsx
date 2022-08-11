import { useEffect, useState } from 'react';
import Logo from './assets/PCNT-logo.svg';
import Mas from './assets/Mas.svg';
import Modal from './components/Modal';
import SelectOptions from './components/SelectOptions';
import ToDos from './components/ToDos';
import Input from './components/Input';
import Header from './components/Header';

const BASE_URL = 'https://api-3sxs63jhua-uc.a.run.app/v1';

const App = () => {
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem('userId')) || ''
  );
  const [toDos, setToDos] = useState([]);
  const [value, setValue] = useState('');
  const [selectOption, setSelectOption] = useState('Todos');
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState(false);

  const getUserId = () => {
    fetch(`${BASE_URL}/userId`)
      .then((response) => response.text())
      .then((data) => {
        setUserId(data);
        localStorage.setItem('userId', JSON.stringify(data));
      });
  };

  const getToDosByUserId = () => {
    fetch(`${BASE_URL}/todo/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setToDos(data);
        setFilter(false);
      });
  };

  const postToDoId = (message) => {
    const data = { title: 'title', message };
    fetch(`${BASE_URL}/todo/${userId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        getToDosByUserId();
      });
  };

  const putToDoId = (check, todoId) => {
    const data = { completed: check, todoId };
    fetch(`${BASE_URL}/todo/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        getToDosByUserId();
      });
  };

  const deleteToDoId = (toDoId) => {
    const data = { todoId: toDoId };
    fetch(`${BASE_URL}/todo/${userId}`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        getToDosByUserId();
      });
  };

  const resetToDoUser = () => {
    fetch(`${BASE_URL}/todo/${userId}/reset`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        getToDosByUserId();
        setModal(!modal);
      });
  };

  const getToDosCompleted = (completed) => {
    fetch(`${BASE_URL}/todo/${userId}/${completed}`)
      .then((response) => response.json())
      .then((data) => {
        setToDos(data);
        setFilter(true);
      });
  };

  const handleSubmit = () => {
    if (value !== '') postToDoId(value);
    setValue('');
  };

  const handleCheck = (e, id) => {
    putToDoId(e.target.checked, id);
  };

  const handleSelect = (e) => {
    setSelectOption(e.target.innerText);
    setOpen(!open);
    if (e.target.innerText === 'Todos') return getToDosByUserId();
    if (e.target.innerText === 'Realizados') return getToDosCompleted(true);
    if (e.target.innerText === 'No Realizados') return getToDosCompleted(false);
  };

  useEffect(() => {
    if (userId === '') {
      getUserId();
    } else {
      getToDosByUserId();
    }
  }, []);

  return (
    <div className="fondo">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      {toDos.length === 0 && !filter && <Header />}
      <Input value={value} setValue={setValue} />
      {(toDos.length !== 0 || filter) && (
        <div className="box">
          <div className="box-items">
            <div className="options">
              <div className="titulo" onClick={() => setModal(!modal)}>
                To do list
                <img src={Mas} alt="mas" />
              </div>
              <SelectOptions
                setOpen={setOpen}
                open={open}
                selectOption={selectOption}
                handleSelect={handleSelect}
              />
            </div>
            <ToDos
              toDos={toDos}
              handleCheck={handleCheck}
              deleteToDoId={deleteToDoId}
            />
          </div>
        </div>
      )}
      <div className="boton-box">
        <button
          className={`boton ${value ? 'activado' : 'desactivado'}`}
          onClick={handleSubmit}>
          Agregar
        </button>
      </div>
      {modal && (
        <Modal
          setModal={setModal}
          modal={modal}
          resetToDoUser={resetToDoUser}
        />
      )}
    </div>
  );
};

export default App;
