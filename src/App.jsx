import { useEffect, useState } from 'react';

const BASE_URL = 'https://api-3sxs63jhua-uc.a.run.app/v1';

const App = () => {
  const [userId, setUserId] = useState('009e36cd-7088-4552-8ad6-7d886a8ca427');
  const [toDos, setToDos] = useState([]);

  const getUserId = () => {
    fetch(`${BASE_URL}/userId`)
      .then((response) => response.text())
      .then((data) => setUserId(data));
  };

  const getToDosByUserId = () => {
    fetch(`${BASE_URL}/todo/${userId}`)
      .then((response) => response.json())
      .then((data) => setToDos(data));
  };

  const postToDoId = () => {
    const data = { title: 'titulo2', message: 'mensaje2' };
    fetch(`${BASE_URL}/todo/${userId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const putToDoId = (toDoId) => {
    const data = { completed: true, todoId: toDoId };
    fetch(`${BASE_URL}/todo/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
      .then((data) => console.log(data));
  };

  const resetToDoUser = () => {
    fetch(`${BASE_URL}/todo/${userId}/reset`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    // getUserId();
    getToDosByUserId();
    // postToDoId();
    // resetToDoUser();
  }, []);

  useEffect(() => {
    if (toDos.length > 0) {
      // putToDoId(toDos[2].id);
      // deleteToDoId(toDos[1].id);
    }
  }, [toDos]);
  return (
    <>
      <h1>ToDoApp</h1>
      <button onClick={() => resetToDoUser()}>Reset</button>
    </>
  );
};

export default App;
