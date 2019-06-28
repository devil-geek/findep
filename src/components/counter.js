import React, { Component } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { StaticQuery, graphql } from "gatsby";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      end: 0
    };
  }

  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({
        end: 630000
      });
    }
  };

  numberWithCommas = x => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            placeholderImage: file(relativePath: { eq: "bg-pareja.jpg" }) {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => (
          <section
            className="section counter"
            style={{
              backgroundImage:
                "url(" + data.placeholderImage.childImageSharp.fluid.src + ")"
            }}
          >
            <VisibilitySensor onChange={this.onVisibilityChange} delayedCall>
              <h1 className="has-text-white has-text-centered subtitle">
                ¡Más de{" "}
                <strong className="has-text-white">
                  <CountUp
                    start={0}
                    end={this.state.end}
                    duration={3}
                    formattingFn={val => this.numberWithCommas(val)}
                  />{" "}
                  clientes satisfechos
                </strong>{" "}
                nos respaldan!
              </h1>
            </VisibilitySensor>
          </section>
        )}
      />
    );
  }
}

export default Counter;
