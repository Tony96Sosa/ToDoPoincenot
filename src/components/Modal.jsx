const Modal = ({ setModal, modal, resetToDoUser }) => {
  return (
    <div className="fondo-modal">
      <div className="contenedor-modal">
        <h1 className="titulo-modal">Empezar nueva lista</h1>
        <p className="texto-modal">
          Cuando comenzás una nueva lista, tu lista existente se elimina. ¿Estás
          seguro que querés empezar una nueva lista?
        </p>
        <div className="buttons-modal">
          <button className="button-modal" onClick={() => setModal(!modal)}>
            Cancelar
          </button>
          <button className="button-modal black" onClick={resetToDoUser}>
            Nueva Lista
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
