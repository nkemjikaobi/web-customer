/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";

// useForm functional component
export const useForm: Function = (
  callbackFunction: Function,
  initialState: any = {}
) => {
  const [Values, SetValues] = useState(initialState);
  const [IsSubmitting, SetIsSubmitting] = useState<boolean>(false);

  // Function to handle form input element change event
  const onChange: Function = (event: React.ChangeEvent<any>) => {
    if (event.target.type === "checkbox") {
      SetValues({
        ...Values,
        [event.target.name]: event.target.checked,
      });
    } else {
      SetValues({ ...Values, [event.target.name]: event.target.value });
    }
  };

  // Function to handle form submission
  const onSubmit: Function = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    SetIsSubmitting(true);
    // triger the callback function
    await callbackFunction();
    SetIsSubmitting(false);
  };

  return { Values, onChange, onSubmit, IsSubmitting, SetValues };
};
