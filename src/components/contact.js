import React from "react";
import {
  FaPhone,
  FaClock,
  FaFacebookF,
  FaYoutube,
  FaMapMarkerAlt
} from "react-icons/fa";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Contact = () => {
  return (
    <section className="section contact container">
      <h1 className="has-text-white has-text-centered subtitle">CONTÁCTANOS</h1>
      <div className="columns">
        <div className="column is-5 is-offset-1">
          <div className="columns is-mobile">
            <div className="column is-1">
              <FaPhone size="fa-lg" />
            </div>
            <div className="column">
              <strong className="has-text-white">01800 600 0009</strong>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-1">
              <FaMapMarkerAlt size="fa-lg" />
            </div>
            <div className="column">
              Av. Nicolás Bravo No. 100 1er. y 3er. Piso Col. Centro, C.P. 5000
              <br />
              <strong className="has-text-white">
                Toluca, Estado de México
              </strong>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-1">
              <FaClock size="fa-lg" />
            </div>
            <div className="column">
              <strong className="has-text-white">Lunes a viernes: </strong>
              09:00h a 18:30h <br />
              <strong className="has-text-white">Sábados: </strong>
              09:00h a 13:30h
            </div>
          </div>
        </div>
        <div className="column is-2 is-offset-3 has-text-centered">
          <a className="button btn-round btn-outline has-mlr-small">
            <FaFacebookF size="fa-lg" />
          </a>
          <a className="button btn-round btn-outline has-mlr-small">
            <FaYoutube size="fa-lg" />
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
              ¡Deseo solicitar un crédito!
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
