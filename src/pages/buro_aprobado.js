import React, { Component } from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import icon from "../images/iconos/icono-ok.svg";
import { navigate } from "gatsby";
import ExpModal from "../components/forms/expirationModal";

class BuroAprobado extends Component {
  componentDidMount() {
    if (!this.props.location) {
      navigate("/");
      return;
    }
  }

  render() {
    const { location } = this.props;
    return (
      <Layout location={location}>
        <Steps isActive={2} />
        <section className="section">
          <div className="has-text-centered">
            <h2 className="has-text-primary has-text-centered subtitle has-text-weight-bold is-size-3">
              ¡FELICIDADES!
            </h2>
            <img width="80px" src={icon} alt="aprobado" />
            <br />
            <br />
            <p className="is-size-5">
              ¡Ya tienes pre aprobado hasta <br />
              <strong className="is-size-2">
                ${location.state && location.state.amount}
                !*
              </strong>
            </p>
            <br />
            <p className="is-size-6">
              Estás a solo 2 pasos de concluir tu solicitud. No lo pienses más y
              déjanos apoyarte a cumplir tus sueños.
            </p>
            <br />
            <p className="is-size-7">
              *Sujeto a evaluación y aprobación de crédito.
            </p>
            <br />
            <div className="columns is-centered">
              <div className="column is-5">
                <button
                  onClick={() => {
                    navigate("/datos_adicionales", { state: location.state });
                  }}
                  className="button is-success btn-block has-text-weight-bold"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </section>
        {location &&
          location.state &&
          location.state.request && (
            <ExpModal statue={location.state.request.status} />
          )}
      </Layout>
    );
  }
}

export default BuroAprobado;
