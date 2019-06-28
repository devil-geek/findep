import React from "react";
import {
  FaPhone,
  FaMapPin,
  FaClock,
  FaFacebookF,
  FaYoutube
} from "react-icons/fa";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Contact = () => {
  return (
    <section className="section contact">
      <h1 className="has-text-white has-text-centered subtitle">CONTÁCTANOS</h1>
      <div className="columns">
        <div className="column">
          <div className="columns is-mobile">
            <div className="column is-1">
              <FaPhone />
            </div>
            <div className="column">
              <strong className="has-text-white">01800 600 0009</strong>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-1">
              <FaMapPin />
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
              <FaClock />
            </div>
            <div className="column">
              <strong className="has-text-white">Lunes a viernes: </strong>
              09:00h a 18:30h <br />
              <strong className="has-text-white">Sábados: </strong>
              09:00h a 13:30h
            </div>
          </div>
        </div>
        <div className="column has-text-centered">
          <a className="button btn-round btn-outline has-mlr-small">
            <FaFacebookF />
          </a>
          <a className="button btn-round btn-outline has-mlr-small">
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="has-text-centered">
        <AnchorLink
          offset="50"
          href="#como_funciona"
          className="button btn-block btn-outline has-text-weight-bold"
        >
          ¡Deseo solicitar un crédito!
        </AnchorLink>
      </div>
    </section>
  );
};

export default Contact;
