import React, { Component } from "react";
import "../styles/main.scss";
import VisibilitySensor from "react-visibility-sensor";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Counter from "../components/counter";
import Layout from "../components/layout";
import Collapsible from "../components/collapsible";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Contact from "../components/contact";
import Footer from "../components/footer";
import Calculator from "../components/calculator";
import Testimonials from "../components/testimonials";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "inicio"
    };
  }

  onVisibilityChange = (id, isVisible) => {
    if (isVisible) {
      this.setState({
        active: id
      });
    }
  };

  render() {
    return (
      <Layout>
        <Navbar active={this.state.active} />
        <VisibilitySensor
          onChange={isVisible => this.onVisibilityChange("inicio", isVisible)}
          delayedCall
        >
          <Header />
        </VisibilitySensor>
        <div className="columns is-centered">
          <div className="column is-4-widescreen is-5-desktop is-6-tablet">
            <Calculator />
            <div className="section is-size-7 is-pl-bottom">
              <p>
                <strong>MICRONEGOCIO: CAT PROMEDIO: 176.6% Sin IVA. </strong>
                <br />
                Para fines informativos y de comparación. Tasa de Interés Anual
                Fija Máxima: 114.8% Plazo Mínimo: 26 semanas Plaza Máximo: 78
                semanas.
              </p>
              <br />
              <p>
                <strong>
                  CREDIINMEDIATO SIMPLE: CAT PROMEDIO: 164.6% Sin IVA.{" "}
                </strong>
                <br />
                Para fines informativos y de comparación. Tasa de Interés Anual
                Fija Máxima: 114.6% Plazo Mínimo: 12 quincenas Plaza Máximo: 48
                quincenas.
              </p>
              <br />
              <p>
                *Sujeto a aprobación de crédito. Consulta términos, condiciones
                de contratación, tasas de interés y comisiones en{" "}
                <a
                  href="https://www.independencia.com.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.independencia.com.mx
                </a>
              </p>
            </div>
          </div>
          <div className="column is-4-widescreen is-offset-1-widescreen is-5-tablet ">
            <VisibilitySensor
              onChange={isVisible =>
                this.onVisibilityChange("como_funciona", isVisible)
              }
              delayedCall
            >
              <section className="section" id="como_funciona">
                <h1 className="has-text-primary has-text-centered subtitle">
                  ¿CÓMO FUNCIONA?
                </h1>
                <div className="columns is-mobile">
                  <div className="column is-1 list-container">
                    <div className="list-num">1</div>
                  </div>
                  <div className="column list-text">
                    <strong>
                      PERSONALIZA TU PRÉSTAMO
                      <br />
                    </strong>
                    Es fácil, rápido y sin complicaciones.
                  </div>
                </div>
                <div className="columns is-mobile">
                  <div className="column is-1 list-container">
                    <div className="list-num">2</div>
                  </div>
                  <div className="column list-text">
                    <strong>
                      CUÉNTANOS UN POCO SOBRE TI
                      <br />
                    </strong>
                    Tus datos con nosotros están protegidos.
                  </div>
                </div>
                <div className="columns is-mobile">
                  <div className="column is-1 list-container">
                    <div className="list-num">3</div>
                  </div>
                  <div className="column list-text">
                    <strong>
                      RÁPIDO
                      <br />
                    </strong>
                    Te daremos respuesta a la solicitud en tiempo real para que
                    no pierdas tiempo.
                  </div>
                </div>
              </section>
            </VisibilitySensor>
          </div>
        </div>

        <div className="columns is-gapless">
          <div className="column is-8">
            <VisibilitySensor
              onChange={isVisible =>
                this.onVisibilityChange("nuestra_empresa", isVisible)
              }
              delayedCall
            >
              <section className="section empresa" id="nuestra_empresa">
                <h1 className="has-text-primary has-text-centered subtitle">
                  NUESTRA EMPRESA
                </h1>
                <p className="is-size-6">
                  A lo largo de nuestra historia nos hemos consolidado como una
                  de las principales empresas de préstamos en México, gracias a
                  nuestra diversidad, solidez y conductas apegadas a nuestros
                  Valores, buscando siempre dar apoyo a empleados y pequeños
                  comerciantes; filosofía que sin duda, nos ha identificado y
                  nos compromete a ser mejores cada día.
                  <br />
                  <br />
                  <strong>
                    Simulador de crédito, tu tienes el plan, nosotros el
                    préstamo que necesitas.
                  </strong>
                  <br />
                  <br />
                  En Financiera independencia te ofrecemos créditos sin aval,
                  sin garantías, fácil, rápido y sin tanto rollo.
                </p>
              </section>
            </VisibilitySensor>
          </div>
          <div className="column">
            <Counter />
          </div>
        </div>

        <section className="section">
          <Testimonials />
          <div className="columns is-centered">
            <div className="column is-4">
              <AnchorLink
                offset="75"
                href="#calcular"
                className="button is-success btn-block has-text-weight-bold"
              >
                ¡Deseo solicitar un crédito!
              </AnchorLink>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-10">
              <Collapsible />
            </div>
          </div>
        </section>

        <Contact />

        <Footer />
      </Layout>
    );
  }
}

export default IndexPage;
