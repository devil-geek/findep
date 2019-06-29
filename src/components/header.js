import React from "react";
import { StaticQuery, graphql } from "gatsby";

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "img-header.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <section className="hero header"
        style=
        {{
          backgroundImage:
            "url(" + data.placeholderImage.childImageSharp.fluid.src + ")"
        }}
        id="inicio"
        >
        <div className="hero-body">
          <div className="container center">
            <h1 className="subtitle is-size-5 has-text-white">
              Obtén tu préstamo, <br />
              fácil, rápido y<br />
              sin tanto rollo.
            </h1>
          </div>
        </div>
      </section>
    )}
  />
);

export default Header;
