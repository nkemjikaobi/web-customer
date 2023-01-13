/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { FormContext, Rules } from "./validator";

interface IProps {
  onError?: Function;
  onSubmit?: Function;
  instantValidate?: boolean;
  [propName: string]: any;
}

class Form extends React.Component<IProps> {
  instantValidate: boolean | undefined;
  submitForm: any;
  formInputs: any = [];
  errors: any = [];
  contextParams: any;
  static defaultProps: {
    onError: () => null;
    onSubmit: () => null;
    instantValidate: boolean;
  };

  constructor(props: IProps) {
    super(props);
    this.instantValidate =
      this.props.instantValidate !== undefined
        ? this.props.instantValidate
        : true;
    this.submitForm = this.handleSubmit.bind(this);
    this.contextParams = {
      attachToForm: this.attachToForm.bind(this),
      detachFromForm: this.detachFromForm.bind(this),
      instantValidate: this.instantValidate,
    };
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.processValidation(this.formInputs).then((result: any) => {
      if (this.errors.length && this.props.onError) {
        this.props.onError(this.errors);
      }
      if (result && this.props.onSubmit) {
        this.props.onSubmit(event);
      }
      return result;
    });
  }

  processValidation(children: any) {
    return new Promise((resolve) => {
      let isValid = true;
      Promise.all(children.map((input: any) => this.parseInput(input))).then(
        (results) => {
          results.forEach((result: any) => {
            if (!result) {
              isValid = false;
            }
          });
          resolve(isValid);
        }
      );
    });
  }

  parseInput(input: any) {
    return new Promise((resolve) => {
      let result = true;
      const validators = input.props.validators;
      if (validators) {
        this.validate(input).then((isvalid: any) => {
          if (!isvalid) {
            result = false;
          }
          resolve(result);
        });
      } else {
        resolve(result);
      }
    });
  }

  validate(input: any) {
    return new Promise((resolve) => {
      const { value, validators } = input.props;
      const result: any = [];
      let valid = true;

      const validations = Promise.all(
        validators.map((validator: any) => Form.getValidator(validator, value))
      ).then((results) => {
        result.push({ input, result: results });
        input.validate(input.state.value);
      });

      validations.then(() => {
        result.forEach((item: any) => {
          item.result.forEach((result: any) => {
            if (!result) {
              valid = false;
              this.errors.push(item.input);
            }
          });
        });
        resolve(valid);
      });
    });
  }

  attachToForm(component: any) {
    if (this.formInputs.indexOf(component) === -1) {
      this.formInputs.push(component);
    }
  }

  detachFromForm(component: any) {
    const componentPos = this.formInputs.indexOf(component);
    if (componentPos !== -1) {
      this.formInputs
        .slice(0, componentPos)
        .concat(this.formInputs.slice(componentPos + 1));
    }
  }

  static addValidationRule(name: string, callback: Function) {
    Rules[name] = callback;
  }

  static removeValidationRule(name: string) {
    delete Rules[name];
  }

  static getValidator(validator: any, value: any) {
    const { rule, args } = Form.parseValidator(validator);
    const result = Rules[rule](value, args);
    return result;
  }

  static parseValidator(validator: string) {
    let rule;
    let args = null;
    const splitIdx = validator.indexOf("|");
    if (splitIdx !== -1) {
      rule = validator.substring(0, splitIdx);
      args = validator.substring(splitIdx + 1);
    } else {
      rule = validator;
    }
    return { rule, args };
  }

  filterRenderProps() {
    const { onError, onSubmit, ...props } = this.props;
    return { ...props };
  }

  render() {
    const filteredProps = this.filterRenderProps();
    return (
      <FormContext.Provider value={this.contextParams}>
        <div>
          <form onSubmit={this.submitForm} {...filteredProps}>
            {this.props.children}
          </form>
        </div>
      </FormContext.Provider>
    );
  }
}

Form.defaultProps = {
  onError: () => null,
  onSubmit: () => null,
  instantValidate: false,
};
export default Form;
