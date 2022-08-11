const ToDos = ({ toDos, handleCheck, deleteToDoId }) => {
  return (
    <>
      {toDos.map((todo) => {
        return (
          <div key={todo.id} className="item">
            <input
              type="checkbox"
              id={todo.id}
              onChange={(e) => handleCheck(e, todo.id)}
              defaultChecked={todo.completed}
            />
            <label htmlFor={todo.id}>{todo.message}</label>
            <button
              className="boton-borrar"
              onClick={() => deleteToDoId(todo.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ToDos;
