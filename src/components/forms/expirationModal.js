import React from "react";
import { navigate } from "gatsby";
import Modal from "../modal";
import { FaUserClock } from "react-icons/fa";

const ExpModal = props => {
  return (
    <Modal
      modal={props && props.status === "EXPIRADO" ? " is-active" : ""}
      close={() => {
        navigate("/");
      }}
      title="¡EXPIRÓ TU SESIÓN!"
      accept={() => {
        navigate("/");
      }}
      acceptText="Cerrar"
    >
      <div className="has-text-centered">
        <div className="has-text-primary">
          <FaUserClock size="4em" />
        </div>
        <br />
        Estimado cliente te informamos que tu sesión ha expirado, hemos revisado
        tus datos y en breve un ejecutivo de la sucursal que seleccionaste se
        pondrá en contacto contigo.
        <br />
        <br />
        <strong>De antemano, agradecemos tu preferencia.</strong>
      </div>
    </Modal>
  );
};

export default ExpModal;
