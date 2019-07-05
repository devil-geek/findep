import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { FaRegThumbsUp } from "react-icons/fa";
import { FacebookShareButton, FacebookIcon } from "react-share";

const shareUrl = "https://www.independencia.com.mx/";
const title = "Financiera Independencia";

const Gracias = () => (
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
      <Layout>
        <Navbar />
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
            <div className="column is-6">
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
              <div className="social">
                <h1 className="has-text-primary has-text-centered subtitle">
                  <FaRegThumbsUp size="2.5rem" />
                  <br />
                  <br />
                  ¡COMPÁRTENOS!
                </h1>
                <p className="has-text-centered">
                  ¿Conoces a alguien a quien le podamos ayudar a cumplir sus
                  objetivos?
                </p>
                <br />
                <div className="columns is-mobile is-centered">
                  <div className="column is-narrow">
                    <FacebookShareButton url={shareUrl} quote={title}>
                      <FacebookIcon size={48} round />
                    </FacebookShareButton>
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
