import React, { Component } from "react";
import { navigate } from "gatsby";

class Form3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "mx",
      state: "",
      city: "",
      telDom: "",
      civil: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    navigate("/datos_de_tu_ocupacion", {
      state: {
        ...this.state,
        amount: this.props.location.amount,
        pay: this.props.location.pay
      }
    });
  };

  handleInputChange = async event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const iname = target.name;

    await this.setState({
      [iname]: value
    });
  };

  render() {
    const { country, state, city, telDom, civil } = this.state;
    return (
      <div className="columns">
        <div className="column">
          <div className="card-content form">
            <div className="columns is-multiline">
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    *País de nacimiento
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="country"
                        id="country"
                        required
                        disabled
                        value={country}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona país</option>
                        <option value="mx">México</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    *Estado
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="state"
                        id="state"
                        value={state}
                        required
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona un estado</option>
                        <option value="cdmx">CDMX</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    *Ciudad
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="city"
                        id="city"
                        value={city}
                        required
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona una ciudad</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    *Estado civil
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="civil"
                        id="civil"
                        required
                        value={civil}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona un estado civil</option>
                        <option value="casado">Casado</option>
                        <option value="divorciado">Divorciado</option>
                        <option value="soltero">Soltero</option>
                        <option value="union_libre">Unión libre</option>
                        <option value="viudo">Viudo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="telDom">
                    *Teléfono domicilio
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="tel"
                      maxLength="10"
                      name="telDom"
                      id="telDom"
                      placeholder="Número de 10 dígitos sin LADA"
                      required
                      value={telDom}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="has-text-centered">
              <button
                onClick={this.handleSubmit}
                className="button is-success btn-block has-text-weight-bold"
              >
                Guardar datos y continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form3;
