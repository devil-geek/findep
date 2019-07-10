import React from "react";

const numberWithCommas = x => {
  if (!x) {
    return;
  }
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const Amortization = props => {
  if (!props || !props.data) {
    return null;
  }
  let sum = { renta: 0 };
  
  if (props.data.amortizacion.length > 0) {
    sum = props.data.amortizacion.reduce((a, b) => ({
      renta: a.renta + b.renta
    }));
  }

  return (
    <div>
      <p className="is-size-7 has-text-weight-bold has-ml-small">
        Datos del cálculo
      </p>
      <table className="table is-size-7 is-fullwidth">
        <thead>
          <tr>
            <th className="has-text-info">Préstamo</th>
            <th className="has-text-info">Comisión por apertura</th>
            <th className="has-text-info">Comisión por investigación</th>
            <th className="has-text-info">IVA</th>
            <th className="has-text-info">Tasa de interés Anual Fija</th>
            <th className="has-text-info">CAT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{numberWithCommas(props.monto)}</td>
            <td>6.5%</td>
            <td>6.5%</td>
            <td>16%</td>
            <td>{props.data && props.data.tasaEfectiva}%</td>
            <td>{props.data && props.data.cat}%</td>
          </tr>
        </tbody>
      </table>

      <table className="table is-size-7 is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th className="has-text-dark">No. periodo</th>
            <th className="has-text-dark">Saldo inicio</th>
            <th className="has-text-dark">Abono a capital</th>
            <th className="has-text-dark">Abono a comisión</th>
            <th className="has-text-dark">Abono a IVA comisión</th>
            <th className="has-text-dark">Interés</th>
            <th className="has-text-dark">IVA Interés</th>
            <th className="has-text-dark">Saldo final</th>
            <th className="has-text-dark">Pago</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.amortizacion.map(item => {
              return (
                <tr key={item.periodo}>
                  <td className="has-text-centered">{item.periodo}</td>
                  <td className="has-text-centered">
                    {numberWithCommas(item.saldoInicial)}
                  </td>
                  <td className="has-text-centered">
                    {numberWithCommas(item.pagoCapital)}
                  </td>
                  <td className="has-text-centered">
                    {numberWithCommas(item.pagoComision)}
                  </td>
                  <td className="has-text-centered">
                    {numberWithCommas(item.pagoComisionIVA)}
                  </td>
                  <td className="has-text-centered">
                    {numberWithCommas(item.pagoInteres)}
                  </td>
                  <td className="has-text-centered">
                    {numberWithCommas(item.pagoInteresIVA)}
                  </td>
                  <td className="has-text-centered">
                    {numberWithCommas(item.saldoFinal)}
                  </td>
                  <td className="has-text-centered">
                    {numberWithCommas(item.renta)}
                  </td>
                </tr>
              );
            })}
          <tr className="has-background-primary">
            <td
              className="has-text-white has-text-weight-semibold right"
              colSpan="9"
            >
              TOTAL A PAGAR: ${numberWithCommas(sum.renta)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="">
        <p className="is-size-7 has-text-weight-bold has-text-info">
          * Comisiones:{" "}
        </p>
        <p className="is-size-7">
          <strong>Por apertura:</strong> 6.5% sobre el monto de crédito.
        </p>
        <p className="is-size-7">
          <strong>Gastos de investigación:</strong> 6.5% sobre el monto de
          crédito.
        </p>
        <p className="is-size-7">
          <strong>Gastos de cobranza:</strong> 10,4 SM (Salarios Mínimos) por
          evento.
        </p>
        <p className="is-size-7">
          <strong>
            Estos datos son de carácter informativo y pueden variar al momento
            de la contratación.
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Amortization;
