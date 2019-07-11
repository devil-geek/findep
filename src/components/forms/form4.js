import React, { Component } from "react";
import { navigate } from "gatsby";
import Axios from "axios";
import moment from "moment";

const ocupaciones = [
  {
    label: "Semi Profesional",
    id: "2PB"
  },
  {
    label: "Ejecutivo",
    id: "2AC"
  },
  {
    label: "Oficinista",
    id: "2AB"
  },
  {
    label: "Profesional",
    id: "2AG"
  },
  {
    label: "Chofer",
    id: "2MA"
  },
  {
    label: "Construcción",
    id: "2OK"
  },
  {
    label: "Guardia (civil o privado)",
    id: "2PC"
  },
  {
    label: "Obrero",
    id: "2SE"
  },
  {
    label: "Servicios",
    id: "1UB"
  },
  {
    label: "Trabajo Pesado (jornalero)",
    id: "2TB"
  },
  {
    label: "Administrador (MG)",
    id: "2OD"
  },
  {
    label: "Independiente/Propietario de Negocio",
    id: "2FA"
  },
  {
    label: "Trabajo de Habilidad (instalador,operador de equipo)",
    id: "2OE"
  },
  {
    label: "Ventas",
    id: "2CC"
  },
  {
    label: "Jubilado",
    id: "2FJ"
  },
  {
    label: "Otros",
    id: "2QA"
  }
];

class Form4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupation: "",
      fuente: "",
      ingreso: "",
      empresa: "",
      telEmpresa: "",
      gastos: "",
      dependientes: "",
      a_mm: "",
      a_yy: "",
      ad_mm: "",
      ad_yy: ""
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

  handleSubmit = async e => {
    await this.makeRequest();
    console.log("Request", this.request);
    navigate("/gracias");
  };

  makeRequest = async () => {
    const {
      occupation,
      fuente,
      ingreso,
      a_mm,
      a_yy,
      ad_mm,
      ad_yy,
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
          antiguedadEmpresa: `01/${a_mm}/${a_yy}`,
          nombreEmpresa: empresa,
          telefonoEmpresa: telEmpresa
        }
      },
      gastosFamiliares: gastos,
      dependientesEconomicos: dependientes,
      domicilio: [
        {
          ...this.request.domicilio[0],
          antiguedadDomicilio: `01/${ad_mm}/${ad_yy}`
        }
      ],
      url: this.props.url
    };

    try {
      const url = process.env.GATSBY_FISA_ENDPOINT + "?paso=cinco";
      const res = await Axios.post(url, this.request);
      if (res.data.status !== undefined) {
        console.log(res.data);
        this.request = JSON.parse(res.data.solicitud.json);
      }
    } catch (e) {
      console.error(e);
    }
  };

  getMonths = () => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      let m = i;
      if (m < 10) {
        m = "0" + i;
      }
      months.push(
        <option key={m} value={m}>
          {m}
        </option>
      );
    }

    return months;
  };

  getYears = () => {
    let years = [];
    const minY = moment()
      .subtract(30, "years")
      .year();
    const maxY = moment().year();

    for (let i = minY; i <= maxY; i++) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return years;
  };

  render() {
    const {
      occupation,
      fuente,
      ingreso,
      empresa,
      telEmpresa,
      gastos,
      dependientes,
      a_mm,
      a_yy,
      ad_mm,
      ad_yy
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
                        {ocupaciones.map(item => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.label}
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
                        <option value="SALARIO">Salario</option>
                        <option value="HONORARIOS">Honorarios</option>
                        <option value="NEGOCIO">Negocio</option>
                        <option value="RENTA">Renta</option>
                        <option value="PENSION">Pensión</option>
                        <option value="JUBILACION">Jubilación</option>
                        <option value="OTRO">Otro</option>
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
                    *Fecha de inicio en empleo / micronegocio
                  </label>
                  <div className="columns is-mobile">
                    <div className="column is-6">
                      <div className="control is-expanded">
                        <div className="select is-fullwidth">
                          <select
                            name="a_mm"
                            id="a_mm"
                            required
                            value={a_mm}
                            onChange={this.handleInputChange}
                          >
                            <option value="">Mes</option>
                            {this.getMonths()}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="column is-6">
                      <div className="control is-expanded">
                        <div className="select is-fullwidth">
                          <select
                            name="a_yy"
                            id="a_yy"
                            required
                            value={a_yy}
                            onChange={this.handleInputChange}
                          >
                            <option value="">Año</option>
                            {this.getYears()}
                          </select>
                        </div>
                      </div>
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
                      pattern="([A-Za-z0-9 ]*)?"
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
                      maxLength="10"
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="antiguedadDom">
                    *Fecha de inicio en el domicilio actual
                  </label>
                  <div className="columns is-mobile">
                    <div className="column is-6">
                      <div className="control is-expanded">
                        <div className="select is-fullwidth">
                          <select
                            name="ad_mm"
                            id="ad_mm"
                            required
                            value={ad_mm}
                            onChange={this.handleInputChange}
                          >
                            <option value="">Mes</option>
                            {this.getMonths()}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="column is-6">
                      <div className="control is-expanded">
                        <div className="select is-fullwidth">
                          <select
                            name="ad_yy"
                            id="ad_yy"
                            required
                            value={ad_yy}
                            onChange={this.handleInputChange}
                          >
                            <option value="">Año</option>
                            {this.getYears()}
                          </select>
                        </div>
                      </div>
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
            <div className="columns">
              <div className="column is-6">
                <div className="has-text-centered">
                  <button
                    id="solicitud-online-4"
                    disabled={
                      !occupation ||
                      !fuente ||
                      !ingreso ||
                      !a_mm ||
                      !a_yy ||
                      !ad_mm ||
                      !ad_yy ||
                      !empresa ||
                      !telEmpresa ||
                      !gastos ||
                      !dependientes
                    }
                    onClick={this.handleSubmit}
                    className="button is-success btn-block has-text-weight-bold"
                  >
                    Finalizar solicitud
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form4;
