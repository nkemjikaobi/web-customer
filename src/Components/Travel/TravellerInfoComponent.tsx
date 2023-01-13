import React, { Fragment } from "react";
import { useForm } from "CustomHooks/FormHook";
import TravellerInfoForm from "Models/ComponentModels/Travel/TravellerInfoForm";

const TravellerInfoComponent: React.FunctionComponent = () => {
  // initialize the form
  const initialForm: TravellerInfoForm = new TravellerInfoForm();

  // method to handle flight booking
  const handleSubmit: Function = async () => {};

  const { onSubmit, onChange, Values } = useForm(handleSubmit, initialForm);

  return <Fragment />;
};

export default TravellerInfoComponent;
