import React, { Fragment } from "react";
import { useForm } from "CustomHooks/FormHook";
import AdditionalServicesForm from "Models/ComponentModels/Travel/AdditionalServicesForm";

const AdditionalServicesComponent: React.FunctionComponent = () => {
  // initialize the form
  const initialForm: AdditionalServicesForm = new AdditionalServicesForm();

  // method to handle flight booking
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit: Function = async () => {
    // TODO: unknown
  };

  const { onSubmit, onChange, Values } = useForm(handleSubmit, initialForm);

  return <Fragment />;
};

export default AdditionalServicesComponent;
