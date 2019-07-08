import React from "react";
import {
  FaPhone,
  FaClock,
  FaFacebookF,
  FaYoutube,
  FaMapMarkerAlt,
  FaInstagram
} from "react-icons/fa";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Contact = () => {
  return (
    <section className="section contact container">
      <h2 className="has-text-white has-text-centered subtitle">CONTÁCTANOS</h2>
      <div className="columns">
        <div className="column is-5 is-offset-1">
          <div className="columns is-mobile">
            <div className="column is-1">
              <FaPhone size="1.2em" />
            </div>
            <div className="column">
              <strong className="has-text-white">01800 600 0009</strong>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-1">
              <FaMapMarkerAlt size="1.2em" />
            </div>
            <div className="column">
              Prolongación Paseo de la Reforma 600 Int.420,
              Col.Santa Fe Peña Blanca. 
              <br />
              <strong className="has-text-white">
                Alcaldía Álvaro Obregón, CDMX
              </strong>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-1">
              <FaClock size="1.2em" />
            </div>
            <div className="column">
              <strong className="has-text-white">Lunes a viernes: </strong>
              09:00h a 18:30h <br />
              <strong className="has-text-white">Sábados: </strong>
              09:00h a 13:30h
            </div>
          </div>
        </div>
        <div className="column is-3 is-offset-3 has-text-centered">
          <a
            aria-label="Instagram"
            href="https://www.instagram.com/financieraindependenciaoficial/?hl=es-la"
            target="_blank"
            rel="noopener noreferrer"
            className="button btn-round btn-outline has-mlr-small"
          >
            <FaInstagram size="1.3em" />
          </a>
          <a
            aria-label="facebook"
            href="https://www.facebook.com/Financiera.Indep/"
            target="_blank"
            rel="noopener noreferrer"
            className="button btn-round btn-outline has-mlr-small"
          >
            <FaFacebookF size="1.3em" />
          </a>
          <a
            aria-label="Youtube"
            href="https://www.youtube.com/channel/UCeIISxyPtdmouQatpSWIRMw?view_as=subscriber"
            target="_blank"
            rel="noopener noreferrer"
            className="button btn-round btn-outline has-mlr-small"
          >
            <FaYoutube size="1.3em" />
          </a>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-4">
          <div className="has-text-centered">
            <AnchorLink
              offset="75"
              href="#calcular"
              className="button btn-block btn-outline has-text-weight-bold"
            >
              ¡Deseo solicitar un préstamo!
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
