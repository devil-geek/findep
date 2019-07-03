import React, { Component } from "react";
import moment from "moment";
import { navigate } from "gatsby";

class Form2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buro: false,
      hipotecarioCredito: "",
      automotrizCredito: "",
      tarjetaCredito: "",
      ccNumber: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    navigate("/datos_adicionales", {
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
    const { tarjetaCredito, buro, ccNumber } = this.state;
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
                        name="col"
                        id="col"
                        required
                        onChange={this.handleInputChange}
                      >
                        <option value="">Selecciona una colonia</option>
                        <option value="12">12 Quincenas</option>
                        <option value="24">24 Quincenas</option>
                        <option value="36">36 Quincenas</option>
                      </select>
                    </div>
                  </div>
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
            <div className="has-text-centered">
              <button
                onClick={this.handleSubmit}
                className="button is-success btn-block has-text-weight-bold"
              >
                Consultar buró y continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form2;
