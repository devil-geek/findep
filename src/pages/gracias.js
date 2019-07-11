import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import {
  FaRegThumbsUp,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaDesktop,
  FaMousePointer
} from "react-icons/fa";

const shareUrl = "https://www.independencia.com.mx/";
const title = "Financiera Independencia";
const twitter = `https://twitter.com/share?url=${shareUrl}&text=${title}&via=${shareUrl}`;
const facebook = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
const linkedin = `https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${title}&summary=${title}&source=${shareUrl}`;

const Gracias = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "img-finish.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Layout location={location}>
        <section
          className="finish hero header"
          style={{
            backgroundImage:
              "url(" + data.placeholderImage.childImageSharp.fluid.src + ")"
          }}
        >
          <h1 className="finish-text title is-size-4 has-text-primary has-background-white ">
            <small className="has-text-grey is-size-7">¡Todo listo!</small>
            <br />
            MUCHAS <br className="is-hidden-desktop" />
            GRACIAS.
          </h1>
        </section>
        <section className="section">
          <div className="columns is-centered">
            <div className="column is-8">
              <p>
                Hemos recibido tus datos y en breve uno de nuestros ejecutivos
                se pondrá en contacto contigo para informarte de los pasos a
                seguir. Muchas gracias por tu preferencia.
              </p>
              <br />
              <p className="has-text-primary has-text-weight-bold">
                ¡Somos Financiera Independencia, tu compañera de planes!
              </p>
              <br />
              <br />
              <div className="columns is-centered">
                <div className="column">
                  <div className="social">
                    <h2 className="has-text-primary has-text-centered subtitle">
                      <FaRegThumbsUp size="2.5em" />
                      <br />
                      <br />
                      ¡COMPÁRTENOS!
                    </h2>
                    <p className="has-text-centered">
                      ¿Conoces a alguien a quien le podamos ayudar a cumplir sus
                      objetivos?
                    </p>
                    <br />
                    <div className="columns is-mobile is-centered">
                      <div className="column is-narrow">
                        <a
                          id="compartir-facebook"
                          href={facebook}
                          target="_blank"
                          className="button btn-round btn-share facebook"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookF size="1.2em" />
                        </a>
                      </div>
                      <div className="column is-narrow">
                        <a
                          id="compartir-twitter"
                          href={twitter}
                          target="_blank"
                          className="button btn-round btn-share twitter"
                          rel="noopener noreferrer"
                        >
                          <FaTwitter size="1.2em" />
                        </a>
                      </div>

                      <div className="column is-narrow">
                        <a
                          id="compartir-linkedin"
                          href={linkedin}
                          target="_blank"
                          className="button btn-round btn-share linkedin"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedinIn size="1.2em" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="social has-text-centered">
                    <h2 className="has-text-primary has-text-centered subtitle">
                      <FaDesktop size="2.5em" />
                      <FaMousePointer size=".9em" />
                      <br />
                      <br />
                      ¡VISÍTANOS!
                    </h2>
                    <p className="has-text-centered">
                      Encuentra toda la información sobre Financiera
                      Independencia.
                    </p>
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={shareUrl}
                      className="button is-success"
                    >
                      Visita nuestro sitio web
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )}
  />
);

export default Gracias;
