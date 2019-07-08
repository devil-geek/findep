import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import icon from "../images/iconos/icono-happy.svg";

const BuroError = ({ location }) => {
  return (
    <Layout location={location}>
      <Steps isActive={2} />
      <section className="section">
        <div className="has-text-centered">
          <h2 className="has-text-primary has-text-centered subtitle">
            ¡GRACIAS POR CONFIAR EN NOSOTROS!
          </h2>
          <img width="80px" src={icon} alt="aprobado" />
          <br />
          <br />
          <p>A la brevedad nos comunicaremos contigo.</p>
          <br />
          <br />
          <button className="button is-success btn-block has-text-weight-bold">
            Enviar datos y finalizar
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default BuroError;
