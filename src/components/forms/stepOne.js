import React, { Component } from "react";

class StepOne extends Component {
  render() {
    return (
      <div>
        <div className="card">
          <div className="card-content form">
            <div className="field">
              <label className="label">¿A qué te dedicas?</label>
              <input
                className="is-checkradio is-success"
                id="exampleRadioInline1"
                type="radio"
                name="exampleRadioInline"
              />
              <label htmlFor="exampleRadioInline1">Soy empleado</label>
              <input
                className="is-checkradio is-success"
                id="exampleRadioInline2"
                type="radio"
                name="exampleRadioInline"
              />
              <label htmlFor="exampleRadioInline2">Tengo un negocio</label>
            </div>

            <div className="field">
              <label className="label">
                ¿Cuánto necesitas?
                <br />
                <small>De $5,000 a $18,500</small>
              </label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" />
              </div>
            </div>

            <div className="field">
              <label className="label">
                ¿Cómo lo quieres pagar?
                <br />
                <small>Escoge un periodo de pago</small>
              </label>
              <input
                className="is-checkradio is-success"
                id="exampleRadioInline1"
                type="radio"
                name="exampleRadioInline"
              />
              <label htmlFor="exampleRadioInline1">Semanal</label>
              <input
                className="is-checkradio is-success"
                id="exampleRadioInline2"
                type="radio"
                name="exampleRadioInline"
              />
              <label htmlFor="exampleRadioInline2">Quincenal</label>
            </div>

            <div className="field">
              <label className="label">
                ¿En qué plazo lo quieres pagar?
                <br />
                <small>De 12 a 36 quincenas</small>
              </label>
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select name="country">
                    <option value="12">12 Quincenas</option>
                    <option value="24">24 Quincenas</option>
                    <option value="36">36 Quincenas</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="response has-text-centered">
              <label className="label">PAGO ESTIMADO</label>
              <p className="response-amount">$6,000.00* MXN</p>
              <small>*Esta cifra es un estimado basado en una simulación</small>
              <br />
              <a>Tabla de amortización</a>
            </div>
            <br/>
            <div className="has-text-centered">
              <button className="button is-success btn-block">
                Continuar solicitud online
              </button>
              <a className="has-text-danger">
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
