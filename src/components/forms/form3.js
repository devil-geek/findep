import React, { Component } from "react";
import { navigate } from "gatsby";
import states from "./states.json";
import Axios from "axios";

class Form3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "mx",
      born_state: "",
      born_city: "",
      telDom: "",
      civil: ""
    };
  }

  componentDidMount() {
    if (!this.props.location) {
      navigate("/");
      return;
    }
    this.request = this.props.location.request;
  }

  handleSubmit = async e => {
    await this.makeRequest();
    console.log(this.request);
    navigate("/datos_de_tu_ocupacion", {
      state: {
        ...this.state,
        amount: this.props.location.amount,
        pay: this.props.location.pay,
        request: this.request
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

  makeRequest = async () => {
    const { born_city, born_state, civil, telDom } = this.state;

    this.request = {
      ...this.request,
      nacimiento: {
        estado: born_state.toUpperCase(),
        municipio: born_city.toUpperCase()
      },
      estadoCivil: civil.toUpperCase(),
      telefono: this.request.telefono.push({
        numeroTelefono: telDom,
        tipoTelefon: "FIJO"
      })
    };

    const api = process.env.GATSBY_API;
    let url = process.env.GATSBY_FISA_ENDPOINT + "?paso=cuatro";

    const res = await Axios.post(api + url, this.request);
    if (res.data.status !== undefined) {
      console.log(res.data);
    }
  };

  render() {
    const { country, born_state, born_city, telDom, civil } = this.state;
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
                  <label className="label" htmlFor="born_state">
                    *Estado
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="born_state"
                        id="born_state"
                        value={born_state}
                        required
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona un estado</option>
                        {states.map(item => {
                          return (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="born_city">
                    *Ciudad
                  </label>
                  <div className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      name="born_city"
                      id="born_city"
                      placeholder="Ciudad de nacimiento"
                      required
                      onChange={this.handleInputChange}
                      value={born_city}
                    />
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
