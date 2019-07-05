import React, { Component } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: ""
    };
  }

  Toggle = () => {
    this.setState(prevState => ({
      collapsed: prevState.collapsed === "open" ? "" : "open"
    }));
  };

  render() {
    const { collapsed } = this.state;

    return (
      <div className={"div-wrapper " + collapsed}>
        <div className="div-text">
          A lo largo de nuestra historia nos hemos consolidado como una de las
          principales empresas de préstamos en México, gracias a nuestra
          diversidad, solidez y conductas apegadas a nuestros Valores, buscando
          siempre dar apoyo a empleados y pequeños comerciantes; filosofía que
          sin duda, nos ha identificado y nos compromete a ser mejores cada día.
          A lo largo de nuestra historia nos hemos consolidado como una de las
          principales empresas de préstamos en México, gracias a nuestra
          diversidad, solidez y conductas apegadas a nuestros Valores, buscando
          siempre dar apoyo a empleados y pequeños comerciantes; filosofía que
          sin duda, nos ha identificado y nos compromete a ser mejores cada día.
        </div>
        <button
          className="button btn-round has-shadow is-hidden-tablet"
          aria-label="mostrar"
          onClick={this.Toggle}
        >
          {collapsed === "open" ? <FaMinus /> : <FaPlus />}
        </button>
      </div>
    );
  }
}

export default Collapsible;
