import React from "react";

const Modal = props => {
  const {
    modal,
    title,
    children,
    close,
    accept,
    disabled,
    idBtn,
    idBtnCancel,
    hasCloseBtn
  } = props;

  return (
    <div className={"modal" + modal}>
      <div className="modal-background" onClick={close} />
      <div className="modal-card">
        <section className="modal-card-body">
          {hasCloseBtn && (
            <button aria-label="cerrar" className="delete" onClick={close} />
          )}

          <div className="has-text-centered is-uppercase">
            <p className="modal-card-title">{title}</p>
          </div>
          {children}
        </section>
        <footer className="modal-card-foot">
          <div className="columns is-centered">
            <div className="column is-5">
              <button
                id={idBtn}
                className="button is-warning btn-block"
                onClick={accept}
                disabled={disabled}
              >
                {props.acceptText || "Aceptar"}
              </button>
              <br />
              {props.cancel && (
                <button
                  id={idBtnCancel}
                  className="button is-text has-text-warning btn-block"
                  onClick={props.cancel}
                >
                  {props.cancelText || "Cancelar"}
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
