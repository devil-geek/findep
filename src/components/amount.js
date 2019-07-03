import React from "react";

const Amount = props => {
  if(!props || !props.location){
    return null
  }
  const { pay, amount } = props.location
  return (
    <div className="wrap-amount">
      <div className="columns is-mobile is-multiline">
        <div className="column is-6-mobile is-12-desktop">
          <p className="has-text-weight-bold">Préstamo</p>
          <p className="has-text-primary">${amount || 0} MXN</p>
        </div>
        <div className="column is-6-mobile is-12-desktop">
          <p className="has-text-weight-bold">Pago estimado</p>
          <p className="has-text-primary has-text-weight-bold">
            ${pay || 0}* MXN
          </p>
        </div>
      </div>
    </div>
  );
};

export default Amount;
