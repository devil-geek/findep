import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
import { navigate } from "gatsby";
import axios from "axios";
import Modal from "./modal";
import Amortization from "./amortization";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupation: "",
      amount: "",
      period: "",
      term: "",
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

    await this.setState({
      [name]: value,
      amountValid: true
    });

    if (name === "amount") {
      if (Number(value) > 18500 || Number(value) < 5000) {
        await this.setState({
          amountValid: false
        });
      }
    }

    if (name === "term") {
      this.calculate();
    }
  };

  calculate = async () => {
    this.setState({
      loading: true
    });
    const { amount, period, term } = this.state;
    const url = process.env.GATSBY_FISA_CALCULATOR;
    const res = await axios.post(process.env.GATSBY_API + url, {
      monto: amount,
      plazo: term,
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
    const { amount, period, term } = this.state;
    const url = process.env.GATSBY_FISA_AMORT;
    const res = await axios.post(process.env.GATSBY_API + url, {
      monto: amount,
      plazo: term,
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
        amount: this.numberWithCommas(parseFloat(this.state.amount).toFixed(2))
      }
    });
  };

  callMe = async e => {
    await this.setState({
      callMe: true
    });
    this.handleSubmit(e);
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
                <small>De $5,000 a $18,500</small>
              </label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="amount"
                  id="amount"
                  min={5000}
                  max={18500}
                  placeholder="$5,000"
                  value={amount}
                  onChange={this.handleInputChange}
                  disabled={!occupation}
                  required
                />
              </div>
              {!amountValid && (
                <p className="help is-danger">
                  La cantidad debe ser de $5,000 a $18,500.
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
                <div className="column is-pl-right is-6">
                  <label className="check-container">
                    Semanalmente
                    <input
                      type="radio"
                      name="period"
                      value="S"
                      onChange={this.handleInputChange}
                      disabled={!amount}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="column is-pl-left is-pl-right">
                  <label className="check-container">
                    Quincenalmente
                    <input
                      type="radio"
                      name="period"
                      value="Q"
                      onChange={this.handleInputChange}
                      disabled={!amount}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="term">
                ¿En qué plazo lo quieres pagar?
                <br />
                <small>De 12 a 36 quincenas</small>
              </label>
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select
                    name="term"
                    id="term"
                    onChange={this.handleInputChange}
                    disabled={!period}
                  >
                    <option value="">Selecciona un plazo</option>
                    {period === "Q" && <option value="12">12 Quincenas</option>}
                    {period === "Q" && <option value="24">24 Quincenas</option>}
                    {period === "Q" && <option value="36">36 Quincenas</option>}
                    {period === "S" && <option value="12">12 Semanas</option>}
                    {period === "S" && <option value="24">24 Semanas</option>}
                    {period === "S" && <option value="36">36 Semanas</option>}
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
                    onClick={() => this.openModal("amortModal")}
                    className="button is-text has-text-link is-size-7"
                  >
                    Consulta aquí la tabla de amortización
                  </button>
                </div>
                <br />
                <div className="has-text-centered">
                  <button
                    disabled={!pay}
                    onClick={this.handleSubmit}
                    className="button is-success btn-block has-text-weight-bold"
                  >
                    Continuar solicitud online
                  </button>
                  <br />
                  <br />
                  <button
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
