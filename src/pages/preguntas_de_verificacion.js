import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import FormTitle from "../components/forms/formTitle";
import Form2 from "../components/forms/form2";
import Amount from "../components/amount";

const PreguntasVerificacion = ({ location }) => {
  return (
    <Layout location={location}>
      <Steps isActive={2} />
      <Amount location={location.state} />
      <FormTitle step={2} title="PREGUNTAS DE VERIFICACIÓN" />
      <Form2 location={location.state} />
    </Layout>
  );
};

export default PreguntasVerificacion;
