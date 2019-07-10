import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import FormTitle from "../components/forms/formTitle";
import Form2 from "../components/forms/form2";
import Amount from "../components/amount";
import ExpModal from "../components/forms/expirationModal";

const PreguntasVerificacion = ({ location }) => {
  return (
    <Layout location={location}>
      <Steps isActive={2} />
      <Amount location={location.state} />
      <FormTitle step={2} title="PREGUNTAS DE VERIFICACIÓN" />
      <Form2 location={location.state} url={location.href}/>
      {location &&
        location.state &&
        location.state.request && (
          <ExpModal statue={location.state.request.status} />
        )}
    </Layout>
  );
};

export default PreguntasVerificacion;
