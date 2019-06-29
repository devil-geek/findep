import React from "react";
import { Link } from "gatsby";
import logo from "../images/logo.png";
import logoText from "../images/logo-text.png";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Toggle = (element, name) => {
  if (element.classList) {
    element.classList.toggle(name);
  } else {
    // For IE9
    let classes = element.className.split(" ");
    let i = classes.indexOf(name);

    if (i >= 0) classes.splice(i, 1);
    else classes.push(name);
    element.className = classes.join(" ");
  }
};
const Menu = () => {
  const main = document.getElementById("main");
  const nav = document.getElementById("nav");
  const menu = document.getElementById("mobileMenu");
  const className = "open";

  Toggle(main, className);
  Toggle(nav, className);
  Toggle(menu, className);
};

const Navbar = props => (
  <div>
    <nav
      id="nav"
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} className="logo-img" alt="Logo-1" />
            <img src={logoText} className="logo-text" alt="Logo-1" />
          </Link>
          {/*eslint-disable-next-line*/}
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
            onClick={Menu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navbarMenu" className="navbar-menu">
          <div className="navbar-end">
            <AnchorLink
              offset="65"
              href="#inicio"
              className={
                props.active === "inicio" ? "navbar-item active" : "navbar-item"
              }
            >
              Inicio
            </AnchorLink>
            <AnchorLink
              offset="65"
              href="#como_funciona"
              className={
                props.active === "como_funciona"
                  ? "navbar-item active"
                  : "navbar-item"
              }
            >
              ¿Cómo funciona?
            </AnchorLink>
            <AnchorLink
              offset="65"
              href="#nuestra_empresa"
              className={
                props.active === "nuestra_empresa"
                  ? "navbar-item active"
                  : "navbar-item"
              }
            >
              Nuestra empresa
            </AnchorLink>
            <Link
              to="/cliente"
              className="navbar-item"
              activeClassName="active"
            >
              <span>¿Eres cliente?</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <div id="mobileMenu">
      <AnchorLink
        onClick={Menu}
        href="#inicio"
        className={
          props.active === "inicio" ? "navbar-item active" : "navbar-item"
        }
      >
        Inicio
      </AnchorLink>
      <AnchorLink
        onClick={Menu}
        offset="50"
        href="#como_funciona"
        className={
          props.active === "como_funciona"
            ? "navbar-item active"
            : "navbar-item"
        }
      >
        ¿Cómo funciona?
      </AnchorLink>
      <AnchorLink
        onClick={Menu}
        offset="50"
        href="#nuestra_empresa"
        className={
          props.active === "nuestra_empresa"
            ? "navbar-item active"
            : "navbar-item"
        }
      >
        Nuestra empresa
      </AnchorLink>
      <Link to="/cliente" className="navbar-item" activeClassName="active">
        <span>¿Eres cliente?</span>
      </Link>
    </div>
  </div>
);

export default Navbar;
