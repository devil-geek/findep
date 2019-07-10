import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import FormTitle from "../components/forms/formTitle";
import Form3 from "../components/forms/form3";
import Amount from "../components/amount";
import ExpModal from "../components/forms/expirationModal";

const DatosAdicionales = ({ location }) => {
  return (
    <Layout location={location}>
      <Steps isActive={3} />
      <Amount location={location.state} />
      <FormTitle step={3} title="DATOS ADICIONALES" />
      <Form3 location={location.state} url={location.href} />
      {location &&
        location.state &&
        location.state.request && (
          <ExpModal statue={location.state.request.status} />
        )}
    </Layout>
  );
};

export default DatosAdicionales;
