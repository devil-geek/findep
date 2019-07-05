import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";
import t1 from "../images/testimonial1.png";
import t2 from "../images/testimonial2.png";

const test = [
  {
    name: "María Galindo, Empleada.",
    text:
      "Me dieron la facilidad para realizar mis pagos en lugares más cercanos a mi casa",
    img: t2
  },
  {
    name: "Clemencia Mateo, Micronegocio.",
    text:
      "Desde hace un año y medio mi negocio de ropa se mantiene en crecimiento; con mi préstamo puedo invertir más en mi negocio",
    img: t1
  }
];

const Testimonial = data => {
  return test.map(item => {
    return (
      <div key={item.name}>
        <article key={item.name} className="media testimonial">
          <figure className="media-left">
            <span className="icon has-text-primary">
              <FaQuoteLeft size="1.5em" />
            </span>
          </figure>
          <div className="media-content">
            <div className="content">
              <p className="is-italic">
                {item.text}
                <br />
                <br />
                <strong>{item.name}</strong>
                <br />
              </p>
            </div>
          </div>
          <figure className="media-right">
            <p className="image is-128x128 is-hidden-mobile">
              <img alt="testimonial" className="is-rounded" src={item.img} />
            </p>
          </figure>
        </article>
      </div>
    );
  });
};

const Testimonials = ({ data }) => {
  const settings = {
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
          slidesToShow: 2,
          slidesToScroll: 2,
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
      <Slider {...settings}>{Testimonial(data)}</Slider>
    </div>
  );
};

export default Testimonials;
