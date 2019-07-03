import React from "react";

const Modal = props => {
  const { modal, title, children, close, accept } = props;

  return (
    <div className={"modal" + modal}>
      <div className="modal-background" onClick={close} />
      <div className="modal-card">
        <section className="modal-card-body">
          <div className="has-text-centered is-uppercase">
            <p className="modal-card-title">{title}</p>
          </div>
          {children}
        </section>
        <footer className="modal-card-foot">
          <div className="columns is-centered">
            <div className="column is-5">
              <button className="button is-primary btn-block" onClick={accept}>
                { props.acceptText || "Aceptar" }
              </button>
              {props.cancel &&
              <button className="button" onClick={close}>
                {props.cancelText || "Cancelar" }
              </button> 
              }
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
