import React from "react";

const FormTitle = props => {
  return (
    <div className="form-title">
      <p className="is-size-7 has-text-weight-bold">Paso {props.step} de 4</p>
      <h2 className="has-text-primary subtitle is-marginless">{props.title}</h2>
      <p className="is-size-7 has-text-grey-light">*Campos obligatorios</p>
    </div>
  );
};

export default FormTitle;
