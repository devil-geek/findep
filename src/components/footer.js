import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Terms from "./terms";
import Privacy from "./privacy";
import Modal from "./modal";

class Footer extends Component {
  constructor(props) {
    super()
    this.state = {
      privacyModal: "",
      termsModal: ""
    };
  }

  openModal = modal => {
    this.setState({
      [modal]: " is-active"
    });
  };

  closeModal = modal => {
    this.setState({
      [modal]: ""
    });
  };

  render() {
    const { termsModal , privacyModal } = this.state
    return (
      <StaticQuery
        query={graphql`
          query {
            allFile(
              sort: { fields: name, order: ASC }
              filter: { relativeDirectory: { eq: "logos" } }
            ) {
              edges {
                node {
                  id
                  name
                  childImageSharp {
                    fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          return (
            <footer className="footer center has-background-white">
              <h2 className="has-text-centered subtitle">GRUPO FINDEP</h2>

              <div className="columns">
                {data.allFile.edges.map(img => {
                  return (
                    <div className="column is-one-fifth" key={img.node.id}>
                      <Img
                        fluid={img.node.childImageSharp.fluid}
                        alt={img.node.name}
                      />
                    </div>
                  );
                })}
              </div>
              <br />

              <div className="has-text-centered is-size-8">
                <p>
                  <strong>
                    Financiera Independencia S.A.B. de C.V. SOFOM. E.N.R.
                  </strong>
                </p>
                <br />
                <p>
                  Estamos constituidos como una SOFOM, ENR, es decir, no
                  requerimos autorización de la SHCP para la realización de
                  operaciones de crédito, y estamos sujetos a la supervisión de
                  la Comisión Nacional Bancaria y de Valores únicamente para
                  efectos de lo dispuesto por el artículo 56 de la Ley General
                  de Organizaciones y Actividades Auxiliares del Crédito”.
                </p>
                <br />
                <p>
                  Prolongación Paseo de la Reforma 600 Int.420, Col.Santa Fe
                  Peña Blanca. Alcaldía Álvaro Obregón, CDMX
                </p>

                <br />
                <br />
                <p className="is-size-6">
                  <button
                    className="button is-white has-text-link is-size-7 is-pl-left is-pl-right"
                    onClick={() => this.openModal("privacyModal")}
                  >
                    Aviso de privacidad
                  </button>
                  {" | "}
                  <button
                    className="button is-white has-text-link is-size-7 is-pl-left is-pl-right"
                    onClick={() => this.openModal("termsModal")}
                  >
                    Términos y condiciones
                  </button>
                </p>
              </div>
              <Modal
                modal={termsModal}
                close={() => this.closeModal("termsModal")}
                title="Términos y condiciones de uso y privacidad"
                accept={() => this.closeModal("termsModal")}
              >
                <Terms />
              </Modal>
              <Modal
                modal={privacyModal}
                close={() => this.closeModal("privacyModal")}
                title="Aviso de privacidad"
                accept={() => this.closeModal("privacyModal")}
              >
                <Privacy />
              </Modal>
            </footer>
          );
        }}
      />
    );
  }
}

export default Footer;
