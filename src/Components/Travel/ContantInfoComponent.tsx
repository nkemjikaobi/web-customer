import React, { Fragment } from "react";
import { useForm } from "CustomHooks/FormHook";
import ContantInfoForm from "Models/ComponentModels/Travel/ContantInfoForm";

const ContantInfoComponent: React.FunctionComponent = () => {
  // initialize the form
  const initialForm: ContantInfoForm = new ContantInfoForm();

  // method to handle flight booking
  const handleSubmit: Function = async () => {};

  const { onSubmit, onChange, Values } = useForm(handleSubmit, initialForm);

  return <Fragment />;
};

export default ContantInfoComponent;
