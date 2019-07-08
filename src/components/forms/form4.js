import React, { Component } from "react";
import { navigate } from "gatsby";
import Axios from "axios";

class Form4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupation: "",
      fuente: "",
      ingreso: "",
      antiguedad: "",
      antiguedadDom: "",
      empresa: "",
      telEmpresa: "",
      gastos: "",
      dependientes: ""
    };
  }

  componentDidMount() {
    if (!this.props.location) {
      navigate("/");
      return;
    }
    this.request = this.props.location.request;
  }

  handleInputChange = async event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const iname = target.name;

    await this.setState({
      [iname]: value
    });
  };

  handleSubmit = async e => {
    await this.makeRequest();
    console.log(this.request);
    navigate("/gracias");
  };

  makeRequest = async () => {
    const {
      occupation,
      fuente,
      ingreso,
      antiguedad,
      antiguedadDom,
      empresa,
      telEmpresa,
      gastos,
      dependientes
    } = this.state;

    this.request = {
      ...this.request,
      datosEmpleo: {
        ocupacion: occupation,
        fuentesIngreso: fuente,
        ingresoMensual: ingreso,
        datosEmpresa: {
          antiguedad: antiguedad,
          nombre: empresa,
          telefono: telEmpresa
        }
      },
      gastosFamiliares: gastos,
      dependientesEconomicos: dependientes,
      domicilio: [
        {
          ...this.request.domicilio[0],
          antiguedad: antiguedadDom
        }
      ]
    };

    const api = process.env.GATSBY_API;
    let url = process.env.GATSBY_FISA_ENDPOINT + "?paso=cinco";

    /* const res = await Axios.post(api + url, this.request);
    if (res.data.status !== undefined) {
      console.log(res.data);
    } */
  };

  render() {
    const {
      occupation,
      fuente,
      ingreso,
      antiguedad,
      antiguedadDom,
      empresa,
      telEmpresa,
      gastos,
      dependientes
    } = this.state;
    return (
      <div className="columns">
        <div className="column">
          <div className="card-content form">
            <div className="columns is-multiline">
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    *Ocupación
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="occupation"
                        id="occupation"
                        value={occupation}
                        required
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona una ocupación</option>
                        <option value="Empleado sector público">
                          Empleado sector público
                        </option>
                        <option value="Empleado sector privado">
                          Empleado sector privado
                        </option>
                        <option value="Negocio propio">Negocio propio</option>
                        <option value="Profesional independiente">
                          Profesional independiente
                        </option>
                        <option value="Arrendador">Arrendador</option>
                        <option value="Pensionado">Pensionado</option>
                        <option value="Jubilado">Jubilado</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    *Fuente de ingresos
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="fuente"
                        id="fuente"
                        value={fuente}
                        required
                        onChange={this.handleInputChange}
                      >
                        <option value="">
                          Selecciona una fuente de ingresos
                        </option>
                        <option value="Salario">Salario</option>
                        <option value="Honorarios">Honorarios</option>
                        <option value="Renta">Renta</option>
                        <option value="Inmuebles">Inmuebles</option>
                        <option value="Pensión">Pensión</option>
                        <option value="Jubilación">Jubilación</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="ingreso">
                    *Ingreso total mensual comprobable
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="ingreso"
                      id="ingreso"
                      value={ingreso}
                      placeholder="Este monto es el total que recibes"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    *Antigüedad en empleo / micronegocio actual
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="antiguedad"
                        id="antiguedad"
                        required
                        value={antiguedad}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Menos de 1 año">Menos de 1 año</option>
                        <option value="1 año">1 año</option>
                        <option value="2 años">2 años</option>
                        <option value="3 años">3 años</option>
                        <option value="4 años">4 años</option>
                        <option value="5 años">5 años</option>
                        <option value="6 años">6 años</option>
                        <option value="7 años">7 años</option>
                        <option value="8 años">8 años</option>
                        <option value="9 años">9 años</option>
                        <option value="10 años">10 años</option>
                        <option value="Más de 10 años">Más de 10 años</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="empresa">
                    *Nombre de empresa / micronegocio actual
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="empresa"
                      id="empresa"
                      value={empresa}
                      placeholder="Escribe el nombre de tu empresa o mi…"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="telEmpresa">
                    *Teléfono de empleo / micronegocio actual
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="telEmpresa"
                      id="telEmpresa"
                      value={telEmpresa}
                      placeholder="Número de 10 dígitos de tu empleo"
                      required
                      onChange={this.handleInputChange}
                      pattern="([0-9]*)?"
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="antiguedadDom">
                    *Antigüedad en el domicilio actual
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="antiguedadDom"
                        id="antiguedadDom"
                        value={antiguedadDom}
                        required
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Menos de 1 año">Menos de 1 año</option>
                        <option value="1 año">1 año</option>
                        <option value="2 años">2 años</option>
                        <option value="3 años">3 años</option>
                        <option value="4 años">4 años</option>
                        <option value="5 años">5 años</option>
                        <option value="6 años">6 años</option>
                        <option value="7 años">7 años</option>
                        <option value="8 años">8 años</option>
                        <option value="9 años">9 años</option>
                        <option value="10 años">10 años</option>
                        <option value="Más de 10 años">Más de 10 años</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="gastos">
                    *Monto gastos familiares mensuales
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="gastos"
                      id="gastos"
                      value={gastos}
                      placeholder="Este monto es el total que gastas"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="dependientes">
                    *Dependientes económicos
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="dependientes"
                        id="dependientes"
                        required
                        value={dependientes}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                      </select>
                    </div>
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
                Finalizar solicitud
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form4;
