const ErrorMessages: any = {
  matchRegexp: (field: any, arg: any) =>
    `${field} does not match the expression: ${arg}`,

  isEmail: (field: string) => `${field} is not a valid email`,

  isEmpty: (field: any) => `${field} should not be empty`,

  required: (field: any) => `${field} is required`,

  isNumber: (field: any) => `${field} should be a number`,

  isFloat: (field: any) => `${field} should be a float value`,

  isPositive: (field: any) => `${field} should be a positive value`,

  maxNumber: (field: any, arg: any) =>
    `${field} should not be greater than ${arg}`,

  minNumber: (field: any, arg: any) =>
    `${field} should not be less than ${arg}`,

  maxFloat: (field: any, arg: any) =>
    `${field} float value should not be more than ${arg}`,

  minFloat: (field: any, arg: any) =>
    `${field} float value should not be less than ${arg}`,

  isString: (field: any) => `${field} should be a string`,

  minStringLength: (field: any, arg: any) =>
    `The ${field} should have a minimum of ${arg} characters`,

  maxStringLength: (field: any, arg: any) =>
    `The ${field} should have a maximum of ${arg} characters`,

  isFile: (field: any) => `The ${field} should be a file`,

  maxFileSize: (field: any, arg: any) =>
    `The ${field} size should not exceed ${arg}`,

  allowedExtensions: () => "Invalid file type",
};

export default ErrorMessages;
