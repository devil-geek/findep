import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";

class Testimonials extends Component {
  Testimonial = () => {
    return (
      <article className="media testimonial">
        <figure className="media-left">
          <span className="icon has-text-primary">
            <FaQuoteLeft size="f3" />
          </span>
        </figure>
        <div className="media-content">
          <div className="content">
            <p className="is-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
              <br />
              <br />
              <strong>John Smith</strong>
              <br />
            </p>
          </div>
        </div>
        <figure className="media-right">
          <p className="image is-128x128 is-hidden-mobile">
            <img
              alt="testimonial"
              className="is-rounded"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
          </p>
        </figure>
      </article>
    );
  };
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 0,
      autoplay: false,
      autoplaySpeed: 3000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="testimonials">
        <h1 className="has-text-primary has-text-centered subtitle">
          LO QUE OPINAN NUESTROS CLIENTES
        </h1>
        <Slider {...settings}>
          <div>{this.Testimonial()}</div>
          <div>{this.Testimonial()}</div>
          <div>{this.Testimonial()}</div>
        </Slider>
      </div>
    );
  }
}

export default Testimonials;
