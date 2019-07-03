import React from "react";

const isActive = (active, index) => {
  let cl = "column";

  if (active === index) {
    cl += " is-4 active";
  } else if (active > index) {
    cl += " complete";
  }

  return cl;
};
const Steps = props => {
  return (
    <div className="steps">
      <div className="columns is-mobile is-gapless has-text-centered">
        <div className={isActive(props.isActive, 1)}>
          <div className="step">
            <span className="is-hidden-touch">Paso 1: Datos Personales</span>
            <span className="is-hidden-desktop">
              {props.isActive === 1 ? "Datos Personales" : "Paso 1"}
            </span>
          </div>
        </div>
        <div className={isActive(props.isActive, 2)}>
          <div className="step">
            <span className="is-hidden-touch">
              Paso 2: preguntas de verificación
            </span>
            <span className="is-hidden-desktop">
              {props.isActive === 2 ? "Preguntas de verificación" : "Paso 2"}
            </span>
          </div>
        </div>
        <div className={isActive(props.isActive, 3)}>
          <div className="step">
            <span className="is-hidden-touch">Paso 3: datos adicionales</span>
            <span className="is-hidden-desktop">
              {props.isActive === 3 ? "Datos adicionales" : "Paso 3"}
            </span>
          </div>
        </div>
        <div className={isActive(props.isActive, 4)}>
          <div className="step">
            <span className="is-hidden-touch">
              Paso 4: datos de tu ocupación
            </span>
            <span className="is-hidden-desktop">
              {props.isActive === 4 ? "Datos de tu ocupación" : "Paso 4"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
