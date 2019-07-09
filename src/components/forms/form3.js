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
    const value =
      target.type === "checkbox" ? target.checked : target.value.toUpperCase();
    const iname = target.name;

    if (target.validity.patternMismatch) {
      return;
    }

    await this.setState({
      [iname]: value
    });
  };

  makeRequest = async () => {
    const { born_state, civil, telDom } = this.state;

    this.request = {
      ...this.request,
      nacimiento: {
        estadoNacimiento: born_state.toUpperCase(),
        municipioNacimiento: ""
      },
      estadoCivil: civil.toUpperCase(),
      domicilio: {
        ...this.request.domicilio,
        telefonoDomicilio: telDom
      }
    };

    try {
      const url = process.env.GATSBY_FISA_ENDPOINT + "?paso=cuatro";
      const res = await Axios.post(url, this.request);
      if (res.data.status !== undefined) {
        console.log(res.data);
        this.request = JSON.parse(res.data.solicitud.json);
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { country, born_state, telDom, civil } = this.state;
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
                    *Entidad federativa de nacimiento
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
                            <option key={item.id} value={item.name.toUpperCase()}>
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
                        <option value="CASADO">Casado</option>
                        <option value="DIVORCIADO">Divorciado</option>
                        <option value="SOLTERO">Soltero</option>
                        <option value="UNION LIBRE">Unión libre</option>
                        <option value="VIUDO">Viudo</option>
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
                      pattern="([0-9]*)?"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="has-text-centered">
              <button
                disabled={
                  !born_state || !civil || !telDom || telDom.length < 10
                }
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
