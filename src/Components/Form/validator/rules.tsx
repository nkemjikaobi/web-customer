/* eslint-disable max-len */
const isExists = (value: any) => {
  return value !== null && value !== undefined;
};

const isEmpty = (value: any) => {
  if (value instanceof Array) {
    return value.length === 0;
  }
  return value === "" || !isExists(value);
};

const isEmptyTrimed = (value: string) => {
  if (typeof value === "string") {
    return value.trim() === "";
  }
  return true;
};

const validations: any = {
  matchRegexp: (value: any, regexp: any) => {
    const validationRegexp =
      regexp instanceof RegExp ? regexp : new RegExp(regexp);
    return validationRegexp.test(value);
  },

  // eslint-disable-next-line
  isEmail: (value: string) =>
    validations.matchRegexp(
      value,
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    ),

  isEmpty: (value: any) => isEmpty(value),

  required: (value: any) => !isEmpty(value),

  trim: (value: any) => !isEmptyTrimed(value),

  isNumber: (value: any) =>
    validations.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i),

  isFloat: (value: any) =>
    validations.matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i),

  isPositive: (value: any) => {
    if (isExists(value)) {
      return (
        (validations.isNumber(value) || validations.isFloat(value)) &&
        value >= 0
      );
    }
    return true;
  },

  maxNumber: (value: any, max: any) =>
    isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10),

  minNumber: (value: any, min: any) =>
    isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10),

  maxFloat: (value: any, max: any) =>
    isEmpty(value) || parseFloat(value) <= parseFloat(max),

  minFloat: (value: any, min: any) =>
    isEmpty(value) || parseFloat(value) >= parseFloat(min),

  isString: (value: any) =>
    !isEmpty(value) || typeof value === "string" || value instanceof String,
  minStringLength: (value: any, length: any) =>
    validations.isString(value) && value.length >= length,
  maxStringLength: (value: any, length: any) =>
    validations.isString(value) && value.length <= length,

  // eslint-disable-next-line no-undef
  isFile: (value: any) => value instanceof File,
  maxFileSize: (value: any, max: any) =>
    validations.isFile(value) && value.size <= parseInt(max, 10),
  allowedExtensions: (value: any, fileTypes: any) =>
    validations.isFile(value) &&
    fileTypes.split(",").indexOf(value.type) !== -1,
};

export default validations;
