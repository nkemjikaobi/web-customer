/* eslint-disable @typescript-eslint/ban-types */
import React, { Component } from "react";
import { FormContext, ErrorMessages } from "../../validator";
import Form from "../../form";
import Label from "../Label";
import Textarea from "../Textarea";
import Select from "../Select";
import Password from "../Password";

interface IProps {
  type?: string;
  label?: string;
  name?: string;
  value?: any;
  validators?: any[];
  onChange?: Function;
  errorMessages?: object;
  errorClass?: string;
  instantValidation?: boolean;
  checked?: boolean;
  disabled?: boolean;
  [propName: string]: any;
}

interface IState {
  value: any;
  isValid: boolean;
  validationErrors: any[];
}

class Input extends Component<IProps, IState> {
  static contextType = FormContext;
  instantValidate: boolean | undefined;
  errors: string[] = [];
  invalid: any = [];
  static defaultProps: {
    type: string;
    label: string;
    name: string;
    value: any;
    validators: never[];
    onChange: () => null;
    errorMessages: never[];
    errorClass: string;
    instantValidation: boolean;
    checked: boolean;
    disabled: boolean;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      value: this.props.value || "",
      isValid: true,
      validationErrors: this.errors,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.context.attachToForm(this);
    this.instantValidate =
      this.props.instantValidation === undefined
        ? this.context.instantValidate
        : this.props.instantValidation;
  }

  componentDidUpdate(_prevProps: any, prevState: any) {
    if (this.instantValidate && this.state.value !== prevState.value) {
      this.validate(this.state.value);
      this.generateErrorMessages();
    }
  }
  componentWillUnmount() {
    this.context.detachFromForm(this);
  }

  handleChange(event: any) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ value });
    if (typeof this.props.onChange === "function") {
      this.props.onChange(event);
    }
  }

  validate(value: any) {
    const validators = this.props.validators;
    if (validators && validators.length > 0) {
      const validations = Promise.all(
        validators.map((validator: any) => Form.getValidator(validator, value))
      );
      validations.then((results) => {
        let isValid = true;
        this.errors = [];
        results.forEach((result, index) => {
          if (!result) {
            isValid = false;
            this.errors.push(validators[index]);
          }
        });
        this.setState({ isValid }, () => {
          this.generateErrorMessages();
        });
      });
    }
  }

  generateErrorMessages() {
    const validators: any = this.props.validators;
    const errorMessages: any = this.props.errorMessages;
    //use preset message instead of default if it exists
    const invalidMessages: string[] = [];
    this.errors.forEach((errorIdx: any) => {
      const { rule, args } = Form.parseValidator(errorIdx);

      if (validators && validators.length > 0) {
        let message;
        if (errorMessages && Object.keys(errorMessages).length > 0) {
          if (errorMessages.hasOwnProperty(rule)) {
            message = errorMessages[rule];
          }
        }
        if (!message) {
          let name = this.props.name;
          if (!name) {
            name = "Field";
          }
          message = ErrorMessages[rule](name, args);
        }

        if (!message) {
          console.warn(`Unable to get error message for ${errorIdx}`);
        } else {
          invalidMessages.push(message);
        }
      }
    });
    this.setState({ validationErrors: invalidMessages });
  }

  displayErrors() {
    const { validationErrors } = this.state;
    if (
      !this.state.isValid &&
      validationErrors &&
      validationErrors.length > 0
    ) {
      return validationErrors.map((error: string, index: number) => (
        <div key={index}>
          <small className={this.props.errorClass}>{error}</small>
        </div>
      ));
    }
    return null;
  }

  filterRenderProps() {
    const {
      type,
      label,
      value,
      validators,
      errorMessages,
      instantValidation,
      onChange,
      errorClass,
      ...props
    } = this.props;
    return props;
  }

  renderField(type: any) {
    const filteredProps = this.filterRenderProps();
    switch (type) {
      case "hidden":
      case "text":
      case "number":
      case "tel":
      case "email":
      case "radio":
      case "checkbox":
      case "date":
      case "time":
        return (
          <div>
            {this.props.label && <Label title={this.props.label} />}
            <input
              onChange={this.handleChange}
              type={type}
              value={this.state.value}
              {...filteredProps}
            />
            {this.displayErrors()}
          </div>
        );

      case "password":
        return (
          <div>
            <Password
              label={this.props.label}
              onChange={this.handleChange}
              toggle={true}
              value={this.state.value}
              {...filteredProps}
            />
            {this.displayErrors()}
          </div>
        );
      case "select":
        return (
          <div>
            <Select
              label={this.props.label}
              onChange={this.handleChange}
              value={this.state.value}
              {...filteredProps}
            />
            {this.displayErrors()}
          </div>
        );
      case "textarea":
        return (
          <div>
            <Textarea
              label={this.props.label}
              onChange={this.handleChange}
              value={this.state.value}
              {...filteredProps}
            />
            {this.displayErrors()}
          </div>
        );
      default:
        console.error(
          "[Input Component] - The type provided in the form definition is not supported"
        );
        return null;
    }
  }
  render() {
    return this.renderField(this.props.type);
  }
}

Input.defaultProps = {
  type: "",
  label: "",
  name: "",
  value: undefined,
  validators: [],
  onChange: () => null,
  errorMessages: [],
  errorClass: "",
  instantValidation: false,
  checked: false,
  disabled: false,
};

export default Input;
