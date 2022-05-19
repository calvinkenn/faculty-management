const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_OPTIONAL = "OPTIONAL";
const VALIDATOR_TYPE_CONFIRMPASSWORD = "CONFIRMPASSWORD";
const VALIDATOR_TYPE_PASSWORD_UPPERCASE = "PASSWORD_UPPERCASE";
const VALIDATOR_TYPE_PASSWORD_LOWERCASE = "PASSWORD_LOWERCASE";
const VALIDATOR_TYPE_PASSWORD_SPECIAL = "PASSWORD_SPECIAL";
const VALIDATOR_TYPE_PASSWORD_NUMBER = "PASSWORD_NUMBER";
const VALIDATOR_TYPE_EMPLOYEENUMBER = "EMPLOYEENUMBER";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_OPTIONAL = () => ({ type: VALIDATOR_TYPE_OPTIONAL });
export const VALIDATOR_CONFIRMPASSWORD = (val) => ({
  type: VALIDATOR_TYPE_CONFIRMPASSWORD,
  val: val,
});
export const VALIDATOR_PASSWORD_UPPERCASE = (val) => ({
  type: VALIDATOR_TYPE_PASSWORD_UPPERCASE,
  val: val,
});
export const VALIDATOR_PASSWORD_LOWERCASE = (val) => ({
  type: VALIDATOR_TYPE_PASSWORD_LOWERCASE,
  val: val,
});
export const VALIDATOR_PASSWORD_SPECIAL = (val) => ({
  type: VALIDATOR_TYPE_PASSWORD_SPECIAL,
  val: val,
});
export const VALIDATOR_PASSWORD_NUMBER = (val) => ({
  type: VALIDATOR_TYPE_PASSWORD_NUMBER,
  val: val,
});
export const VALIDATOR_EMPLOYEENUMBER = (val) => ({
  type: VALIDATOR_TYPE_EMPLOYEENUMBER,
  val: val,
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_OPTIONAL) {
      isValid = true;
    }
    if (validator.type === VALIDATOR_TYPE_CONFIRMPASSWORD) {
      isValid = isValid && value === validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD_UPPERCASE) {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      isValid = isValid && uppercaseRegExp.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD_LOWERCASE) {
      const lowercaseRegExp = /(?=.*?[a-z])/;
      isValid = isValid && lowercaseRegExp.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD_SPECIAL) {
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      isValid = isValid && specialCharRegExp.test(value);
      // digitsRegExp.test(value) &&
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD_NUMBER) {
      const digitsRegExp = /(?=.*?[0-9])/;
      isValid = isValid && digitsRegExp.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_EMPLOYEENUMBER) {
      isValid = isValid && /^\d{4}-\d{1}/.test(value);
    }
  }
  return isValid;
};
