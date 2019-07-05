import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import icon from "../images/iconos/icono-sad.svg";
 
const BuroRechazado = ({ location }) => {
  return (
    <Layout>
      <Navbar />
      <Steps isActive={2} />
      <section className="section">
        <div className="has-text-centered">
          <h2 className="has-text-primary has-text-centered subtitle">
            ¡LO SENTIMOS!
          </h2>
          <img width="80px" src={icon} alt="aprobado" />
          <br />
          <br />
          <p>En estos momentos no es posible ofrecerte un préstamo.</p>
          <br />
          <p className="is-size-6">
            Estamos seguros de que más adelante podremos ayudarte.
          </p>
          <br />
          <p className="is-size-6">
            <strong>¡Gracias por tu preferencia!</strong>
          </p>
          <br />
          <button className="button is-success btn-block has-text-weight-bold">
            Enviar datos y finalizar
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default BuroRechazado;
