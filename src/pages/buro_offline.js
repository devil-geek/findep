import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import icon from "../images/iconos/icono-sad.svg";
import { navigate } from "gatsby";

const BuroError = ({ location }) => {
  return (
    <Layout location={location}>
      <Steps isActive={2} />
      <section className="section">
        <div className="has-text-centered">
          <h2 className="has-text-primary has-text-centered subtitle has-text-weight-bold is-size-3">
            ¡LO SENTIMOS!
          </h2>
          <img width="80px" src={icon} alt="aprobado" />
          <br />
          <br />
          <p className="is-size-6">
            No fue posible realizar la consulta de tu Buró en línea.
          </p>
          <br />
          <p className="is-size-6">A la brevedad nos comunicaremos contigo.</p>
          <br />
          <p className="is-size-6">
            <strong>¡Gracias por confiar en nosotros!</strong>
          </p>
          <br />
          <div className="columns is-centered">
            <div className="column is-5">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="button is-success btn-block has-text-weight-bold"
              >
                Enviar datos y finalizar
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BuroError;
