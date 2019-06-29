import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Footer = () => (
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
          <h1 className="has-text-centered subtitle">GRUPO FINDEP</h1>

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

          <div className="has-text-centered is-size-7">
            <p>
              <strong>
                Financiera Independencia S.A.B. de C.V. SOFOM. E.N.R.
              </strong>
            </p>
            <br />
            <p>
              Estamos constituidos como una SOFOM, ENR, es decir, no requerimos
              autorización de la SHCP para la realización de operaciones de
              crédito, y estamos sujetos a la supervisión de la Comisión
              Nacional Bancaria y de Valores únicamente para efectos de lo
              dispuesto por el artículo 56 de la Ley General de Organizaciones y
              Actividades Auxiliares del Crédito”.
            </p>
            <br />
            <p>
              Prolongación Paseo de la Reforma 600 Int.420, Col.Santa Fe Peña
              Blanca. Alcaldía Álvaro Obregón, CDMX
            </p>

            <br />
            <br />
            <p>
              <a>Aviso de privacidad</a> | <a>Términos y condiciones</a>
            </p>
          </div>
        </footer>
      );
    }}
  />
);

export default Footer;
