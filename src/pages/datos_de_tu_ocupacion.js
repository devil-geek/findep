import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import FormTitle from "../components/forms/formTitle";
import Form4 from "../components/forms/form4";
import Amount from "../components/amount";

const DatosOcupacion = ({ location }) => {
  return (
    <Layout location={location}>
      <Steps isActive={4} />
      <Amount location={location.state} />
      <FormTitle step={4} title="DATOS DE TU OCUPACIÓN" />
      <Form4 location={location.state} />
    </Layout>
  );
};

export default DatosOcupacion;
