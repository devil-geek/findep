import React, { Component } from "react";

class StepOne extends Component {
  render() {
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
                    <input type="radio" name="radio" />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="column is-pl-left is-pl-right">
                  <label className="check-container">
                    Tengo un negocio
                    <input type="radio" name="radio" />
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
                  type="text"
                  name="amount"
                  id="amount"
                  placeholder="$5,000"
                />
              </div>
              <p className="help is-danger">
                Queremos saber cuánto necesitas para cumplir tus objetivos.
              </p>
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
                    <input type="radio" name="radio" />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="column is-pl-left is-pl-right">
                  <label className="check-container">
                    Quincenalmente
                    <input type="radio" name="radio" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="plazo">
                ¿En qué plazo lo quieres pagar?
                <br />
                <small>De 12 a 36 quincenas</small>
              </label>
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select name="plazo" id="plazo">
                    <option value="">Selecciona un plazo</option>
                    <option value="12">12 Quincenas</option>
                    <option value="24">24 Quincenas</option>
                    <option value="36">36 Quincenas</option>
                  </select>
                </div>
              </div>
              <p className="help is-danger">
                Necesitamos este dato para poder calcular tu solicitud
                correctamente.
              </p>
            </div>

            <div className="response has-text-centered">
              <label className="label">PAGO ESTIMADO</label>
              <p className="response-amount">$6,000.00* MXN</p>
              <small>*Esta cifra es un estimado basado en una simulación</small>
              <br />
              <a>Tabla de amortización</a>
            </div>
            <br />
            <div className="has-text-centered">
              <button className="button is-success btn-block has-text-weight-bold">
                Continuar solicitud online
              </button>
              <a className="has-text-danger has-text-undeline">
                O quiero que me hablen por teléfono
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StepOne;
