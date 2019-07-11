import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
import { navigate } from "gatsby";
import axios from "axios";
import Modal from "./modal";
import Amortization from "./amortization";
import rules from "./fisa";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupation: "",
      amount: "",
      period: "",
      plazo: "",
      pay: "",
      loading: false,
      amountValid: true,
      amortModal: "",
      callMe: false
    };
  }

  numberWithCommas = x => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  handleInputChange = async event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { occupation } = this.state;

    if (target.validity.patternMismatch) {
      return;
    }

    await this.setState({
      [name]: value,
      amountValid: true
    });

    if (name === "amount") {
      if (
        Number(value) > rules.monto[occupation].max ||
        Number(value) < rules.monto[occupation].min
      ) {
        await this.setState({
          amountValid: false
        });
      }
    }

    if (name === "occupation") {
      if (value === "FORMAL") {
        this.setState({
          period: "Q"
        });
      } else if (value === "MICRONEGOCIO") {
        this.setState({
          period: "S"
        });
      }
    }

    if (name === "plazo") {
      this.calculate();
    }
  };

  calculate = async () => {
    this.setState({
      loading: true
    });
    const { amount, period, plazo } = this.state;
    const url = process.env.GATSBY_FISA_CALCULATOR;
    const res = await axios.post(url, {
      monto: amount,
      plazo: plazo,
      pago: 0,
      periodo: period
    });

    if (res.data.renta) {
      this.setState({
        pay: this.numberWithCommas(res.data.renta.toFixed(2)),
        loading: false
      });
      this.amort();
    }
  };

  amort = async () => {
    this.setState({
      loading: true
    });
    const { amount, period, plazo } = this.state;
    const url = process.env.GATSBY_FISA_AMORT;
    const res = await axios.post(url, {
      monto: amount,
      plazo: plazo,
      pago: 0,
      periodo: period
    });

    if (res.data.amortizacion) {
      this.setState({
        amortization: res.data,
        loading: false
      });
    }
  };

  openModal = modal => {
    this.setState({
      [modal]: " is-active"
    });
  };

  closeModal = modal => {
    this.setState({
      [modal]: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    navigate("/datos_personales", {
      state: {
        ...this.state,
        amount: this.numberWithCommas(parseFloat(this.state.amount).toFixed(2)),
        monto: parseFloat(this.state.amount)
      }
    });
  };

  callMe = async e => {
    await this.setState({
      callMe: true
    });
    this.handleSubmit(e);
  };

  getOptions = () => {
    const { period, amount } = this.state;
    let plazos =
      amount > rules.plazo[period].short.max
        ? rules.plazo[period].long.plazos
        : rules.plazo[period].short.plazos;
    return plazos.map(item => {
      return (
        <option key={item} value={item}>
          {item} {this.getPeriodName(period)}
        </option>
      );
    });
  };

  getPeriodName = p => {
    switch (p) {
      case "S":
        return "Semanas";
      case "Q":
        return "Quincenas";
      default:
        return "";
    }
  };

  getPlazoMax = () => {
    const { amount, period } = this.state;
    let plazoMax = "";
    if (!period) {
      return plazoMax;
    }

    if (amount > rules.plazo[period].short.max) {
      plazoMax =
        rules.plazo[period].long.plazos[
          rules.plazo[period].long.plazos.length - 1
        ];
    } else {
      plazoMax =
        rules.plazo[period].short.plazos[
          rules.plazo[period].short.plazos.length - 1
        ];
    }

    if (period === "S") {
      plazoMax += " semanas";
    } else {
      plazoMax += " quincenas";
    }

    return `De ${rules.plazo[period].short.plazos[0]} a ${plazoMax}`;
  };

  render() {
    const {
      amount,
      period,
      occupation,
      pay,
      loading,
      amountValid,
      amortModal
    } = this.state;
    return (
      <div>
        <div className="card has-shadow">
          <div className="card-content form calculate" id="calcular">
            <div className="field">
              <label className="label">¿A qué te dedicas?</label>
              <div className="columns is-mobile is-gapless-mobile">
                <div className="column is-pl-right is-6">
                  <label className="check-container">
                    Soy empleado
                    <input
                      type="radio"
                      name="occupation"
                      value="FORMAL"
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="column is-pl-left is-pl-right">
                  <label className="check-container">
                    Tengo un negocio
                    <input
                      type="radio"
                      name="occupation"
                      value="MICRONEGOCIO"
                      onChange={this.handleInputChange}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="amount">
                ¿Cuánto necesitas?
                <br />
                <small>
                  {occupation !== ""
                    ? "De $" +
                      rules.monto[occupation].min +
                      " a $" +
                      rules.monto[occupation].max
                    : ""}
                </small>
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="amount"
                  id="amount"
                  placeholder="$5,000"
                  value={amount}
                  onChange={this.handleInputChange}
                  disabled={!occupation}
                  required
                  pattern="\d*"
                />
              </div>
              {!amountValid && (
                <p className="help is-danger">
                  La cantidad debe ser de ${rules.monto[occupation].min} a $
                  {rules.monto[occupation].max}.
                </p>
              )}
            </div>

            <div className="field">
              <label className="label">
                ¿Cómo lo quieres pagar?
                <br />
                <small>Escoge un periodo de pago</small>
              </label>
              <div className="columns is-mobile is-gapless-mobile">
                {occupation !== "FORMAL" && (
                  <div className="column is-pl-right is-6">
                    <label className="check-container">
                      Semanalmente
                      <input
                        type="radio"
                        name="period"
                        value="S"
                        onChange={this.handleInputChange}
                        disabled={!amount}
                        checked={period === "S"}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                )}
                {occupation !== "MICRONEGOCIO" && (
                  <div className="column is-pl-right">
                    <label className="check-container">
                      Quincenalmente
                      <input
                        type="radio"
                        name="period"
                        value="Q"
                        onChange={this.handleInputChange}
                        disabled={!amount}
                        checked={period === "Q"}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="plazo">
                ¿En qué plazo lo quieres pagar?
                <br />
                <small>{this.getPlazoMax()}</small>
              </label>
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select
                    name="plazo"
                    id="plazo"
                    onChange={this.handleInputChange}
                    disabled={!period || !amountValid}
                  >
                    <option value="">Selecciona un plazo</option>
                    {period && this.getOptions()}
                  </select>
                </div>
              </div>
            </div>
            {loading && (
              <div className="has-text-centered has-text-primary">
                <FaSpinner className="icon-spin" size="3em" />
              </div>
            )}
            {pay && (
              <div>
                <div className="response has-text-centered">
                  <label className="label">PAGO ESTIMADO</label>
                  <p className="response-amount">${pay}* MXN</p>
                  <small>
                    *Esta cifra es un estimado basado en una simulación
                  </small>
                  <br />
                  <button
                    id="consulta-tabla-amortizacion"
                    onClick={() => this.openModal("amortModal")}
                    className="button is-text has-text-link is-size-7"
                  >
                    Consulta aquí la tabla de amortización
                  </button>
                </div>
                <br />
                <div className="has-text-centered">
                  <button
                    id="solicitud-online"
                    disabled={!pay}
                    onClick={this.handleSubmit}
                    className="button is-success btn-block has-text-weight-bold"
                  >
                    Continuar solicitud online
                  </button>
                  <br />
                  <br />
                  <button
                    id="llamada-telefonica"
                    onClick={this.callMe}
                    className="button is-text has-text-danger is-size-7"
                  >
                    O quiero que me hablen por teléfono
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal
          title="Tabla de amortización"
          modal={amortModal}
          close={() => this.closeModal("amortModal")}
          accept={() => this.closeModal("amortModal")}
        >
          <Amortization
            data={this.state.amortization}
            monto={this.state.amount}
            total={0}
          />
        </Modal>
      </div>
    );
  }
}

export default Calculator;
