import React, { Component } from "react";
import moment from "moment";
import { navigate } from "gatsby";
import Axios from "axios";

class Form2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buro: false,
      hipotecarioCredito: "",
      automotrizCredito: "",
      tarjetaCredito: "",
      ccNumber: "",
      cover: []
    };
  }

  componentDidMount() {
    if (!this.props.location) {
      navigate("/");
      return;
    }
    this.request = this.props.location.request;
    this.getOffices();
  }

  getOffices = async () => {
    const sucUrl = process.env.GATSBY_SUC;
    const { location } = this.props;
    const offices = location.sucursales.filter(
      i => i.asentamiento === location.col
    );

    for (let index = 0; index < offices.length; index++) {
      const element = offices[index];
      const res = await Axios.get(sucUrl + `?oficina=${element.oficina}`);
      element.ubicacion = res.data.payload[0];
    }

    this.setState({
      cover: offices
    });
  };

  handleSubmit = async e => {
    await this.makeRequest();
    console.log("Request", this.request);

    //let next = "/buro_error";
    let next = "/buro_aprobado";

    if (this.request.status === "APROBADO") {
      next = "/buro_aprobado";
    } else if (this.request.status === "RECHAZADO") {
      next = "/buro_rechazado";
    } else if (this.request.status === "ERROR") {
      next = "/buro_offline";
    }

    navigate(next, {
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

    if (iname === "suc") {
      const { cover } = this.state;

      const sucInfo = cover.filter(item => item.oficina === Number(value))[0];

      this.setState({
        sucInfo
      });
    }
  };

  makeRequest = async () => {
    const {
      buro,
      hipotecarioCredito,
      automotrizCredito,
      tarjetaCredito,
      ccNumber,
      suc
    } = this.state;

    this.request = {
      ...this.request,
      datosBuro: {
        consultaBuro: "S",
        tarjetaCredito: tarjetaCredito,
        numeroTarjetaCredito: ccNumber,
        hipotecarioCredito: hipotecarioCredito,
        automotrizCredito: automotrizCredito,
        autorizacion: "" + buro
      },
      sucursal: suc,
      url: this.props.url
    };

    try {
      const url = process.env.GATSBY_FISA_ENDPOINT + "?paso=tres";
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
    const {
      tarjetaCredito,
      buro,
      ccNumber,
      cover,
      sucInfo,
      automotrizCredito,
      hipotecarioCredito
    } = this.state;

    return (
      <div className="columns">
        <div className="column">
          <div className="card-content form">
            <div className="field">
              <label className="check-container">
                Autorizo consulta de buró de crédito
                <input
                  type="checkbox"
                  name="buro"
                  checked={buro}
                  required
                  onChange={this.handleInputChange}
                />
                <span className="checkmark checkbox" />
              </label>
            </div>
            <br />
            <p className="has-text-success is-size-7">
              Hoy siendo{" "}
              <strong className="has-text-success">
                {moment().format("DD/MM/YYYY")}
              </strong>{" "}
              autoriza a Financiera Independencia, S.A.B. de C.V., SOFOM,
              E.N.R., a consultar sus antecedentes crediticios por única ocasión
              ante las Sociedades de Información crediticia que estime
              conveniente, declarando que conoce la naturaleza, alcance y uso
              que Financiera Independencia, S.A.B. de C.V., SOFOM, E.N.R. hará
              de tal información.
            </p>
            <br />
            <div className="columns is-multiline">
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label">
                    *¿Eres titular de un crédito hipotecario que aún estés
                    pagando?
                    <br />
                    <small>
                      Contesta “SÍ” únicamente si el crédito hipotecario y/o
                      vivienda aún está vigente y fue tramitado con un Banco o
                      Institución Financiera. Créditos Fovissste o Issste no son
                      considerados.
                    </small>
                  </label>
                  <div className="columns is-mobile is-gapless-mobile">
                    <div className="column is-pl-right is-6">
                      <label className="check-container">
                        Sí
                        <input
                          type="radio"
                          name="hipotecarioCredito"
                          value="S"
                          required
                          onChange={this.handleInputChange}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="column is-pl-left is-pl-right">
                      <label className="check-container">
                        No
                        <input
                          type="radio"
                          name="hipotecarioCredito"
                          value="N"
                          required
                          onChange={this.handleInputChange}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label">
                    *¿Eres titular de un crédito automotriz vigente o tuviste
                    uno en los últimos 2 años (24 meses)?
                    <br />
                    <small>
                      Nota: Puede ser un crédito bancario o no bancario.
                    </small>
                  </label>
                  <div className="columns is-mobile is-gapless-mobile">
                    <div className="column is-pl-right is-6">
                      <label className="check-container">
                        Sí
                        <input
                          type="radio"
                          name="automotrizCredito"
                          value="S"
                          required
                          onChange={this.handleInputChange}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="column is-pl-left is-pl-right">
                      <label className="check-container">
                        No
                        <input
                          type="radio"
                          name="automotrizCredito"
                          value="N"
                          required
                          onChange={this.handleInputChange}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label">
                    *¿Eres titular de una tarjeta de crédito vigente emitida por
                    alguna institución bancaria o comercial?
                    <br />
                    <small>
                      Nota: Verifica que tu tarjeta sea de CRÉDITO, si tienes
                      tarjeta de débito o de nómina, de vales de despensa o
                      tarjetas de servicio como American Express o departamental
                      entonces responde “NO”.
                    </small>
                  </label>
                  <div className="columns is-mobile is-gapless-mobile">
                    <div className="column is-pl-right is-6">
                      <label className="check-container">
                        Sí
                        <input
                          type="radio"
                          name="tarjetaCredito"
                          value="S"
                          required
                          onChange={this.handleInputChange}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="column is-pl-left is-pl-right">
                      <label className="check-container">
                        No
                        <input
                          type="radio"
                          name="tarjetaCredito"
                          value="N"
                          required
                          onChange={this.handleInputChange}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>

                {tarjetaCredito === "S" && (
                  <div className="field">
                    <label className="label has-text-grey-light" htmlFor="name">
                      *Escribe los últimos 4 dígitos de la tarjeta
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="ccNumber"
                        id="ccNumber"
                        maxLength="4"
                        value={ccNumber}
                        placeholder="últimos 4 dígitos de la tarjeta"
                        required
                        onChange={this.handleInputChange}
                        pattern="([0-9]*)?"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    *Sucursal y consulta a buró de crédito
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="suc"
                        id="suc"
                        required
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona una sucursal</option>
                        {cover &&
                          cover.map(item => {
                            return (
                              <option
                                key={item.ubicacion.nombre}
                                value={item.oficina}
                              >
                                {item.ubicacion.nombre}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  {sucInfo && (
                    <p className="help has-text-centered is-size-7">
                      <strong>Dirección:</strong>
                      <br />
                      {sucInfo.ubicacion.calle}, Col.{" "}
                      {sucInfo.ubicacion.colonia}
                      <br />
                      C.P. {sucInfo.ubicacion.cp}, {sucInfo.municipio},{" "}
                      {sucInfo.estado}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <br />
            <p className="is-size-7">
              El llenado de la presente pre-solicitud, no exenta de la
              entrevista personal y llenado de la solicitud definitiva en
              sucursal, para verificar si cumple con las políticas de crédito de
              Financiera Independencia.
            </p>
            <br />
            <div className="columns">
              <div className="column is-6">
                <div className="has-text-centered">
                  <button
                    onClick={this.handleSubmit}
                    disabled={
                      !sucInfo ||
                      !buro ||
                      !automotrizCredito ||
                      !hipotecarioCredito ||
                      !tarjetaCredito ||
                      (tarjetaCredito === "S" && !ccNumber) ||
                      (tarjetaCredito === "S" &&
                        ccNumber &&
                        ccNumber.length < 4)
                    }
                    className="button is-success btn-block has-text-weight-bold"
                  >
                    Consultar buró y continuar
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

export default Form2;
