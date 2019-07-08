import React from "react";
import Steps from "../components/steps";
import Layout from "../components/layout";
import FormTitle from "../components/forms/formTitle";
import Form1 from "../components/forms/form1";
import Amount from "../components/amount";

const StepOne = ({ location }) => {
  return (
    <Layout location={location}>
      <Steps isActive={1} />
      <Amount location={location.state} />
      <FormTitle step={1} title="REGISTRO" />
      <Form1 location={location.state} />
    </Layout>
  );
};

export default StepOne;
