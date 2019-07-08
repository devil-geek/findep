import React from "react";
import Layout from "../components/layout";
import icon from "../images/iconos/icono-sad.svg";

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <section className="section">
      <div className="has-text-centered">
        <h2 className="has-text-primary has-text-centered subtitle">
          ¡LO SENTIMOS!
        </h2>
        <img width="80px" src={icon} alt="aprobado" />
        <br />
        <br />
        <p>La página que buscas no existe.</p>
        <br />
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
