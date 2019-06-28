import React from "react";
import "../styles/main.scss";
import Counter from "../components/counter";
import Layout from "../components/layout";
import Collapsible from "../components/collapsible";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Contact from "../components/contact";
import Footer from "../components/footer";
import StepOne from "../components/forms/stepOne"

const IndexPage = () => (
  <Layout>
    <StepOne/>
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
          Te daremos respuesta a la solicitud en tiempo real para que no pierdas
          tiempo.
        </div>
      </div>
    </section>

    <section className="section empresa" id="nuestra_empresa">
      <h1 className="has-text-primary has-text-centered subtitle">
        NUESTRA EMPRESA
      </h1>
      <p className="is-size-6">
        A lo largo de nuestra historia nos hemos consolidado como una de las
        principales empresas de préstamos en México, gracias a nuestra
        diversidad, solidez y conductas apegadas a nuestros Valores, buscando
        siempre dar apoyo a empleados y pequeños comerciantes; filosofía que sin
        duda, nos ha identificado y nos compromete a ser mejores cada día.
        <br />
        <br />
        <strong>
          Simulador de crédito, tu tienes el plan, nosotros el préstamo que
          necesitas.
        </strong>
        <br />
        <br />
        En Financiera independencia te ofrecemos créditos sin aval, sin
        garantías, fácil, rápido y sin tanto rollo.
      </p>
    </section>

    <Counter />

    <section className="section">
      <AnchorLink
        offset="50"
        href="#como_funciona"
        className="button is-success btn-block"
      >
        ¡Deseo solicitar un crédito!
      </AnchorLink>
      <Collapsible />
    </section>

    <Contact/>

    <Footer/>
  </Layout>
);

export default IndexPage;
