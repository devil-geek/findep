import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import icon from "../images/iconos/icono-ok.svg";
import { navigate } from 'gatsby'

const BuroAprobado = ({ location }) => {
  return (
    <Layout location={location}>
      <Steps isActive={2} />
      <section className="section">
        <div className="has-text-centered">
          <h2 className="has-text-primary has-text-centered subtitle">
            ¡FELICIDADES!
          </h2>
          <img width="80px" src={icon} alt="aprobado" />
          <br />
          <br />
          <p> 
            ¡Ya tienes pre aprobado hasta <br />
            <strong className="is-size-5">$12,000!*</strong>
          </p>
          <br />
          <p className="is-size-7">
            Estás a solo 2 pasos de concluir tu solicitud. No lo pienses más y
            déjanos apoyarte a cumplir tus sueños.
          </p>
          <br />
          <p className="is-size-7">
            *Sujeto a evaluación y aprobación de crédito.
          </p>
          <br />
          <button onClick={() => { navigate("/datos_adicionales",{ state: location.state }) }} className="button is-success btn-block has-text-weight-bold">
            Continuar
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default BuroAprobado;
