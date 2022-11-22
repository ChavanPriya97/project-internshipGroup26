const { default: mongoose } = require("mongoose");

/*****************************ObjectId Validation**************************************/
const isValidId = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
};

/*****************************String Validation**************************************/
const isValidString1 = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  if (! /^[a-z][a-z ]+[a-z]$/.test(value)) return false;
  return true;
};


const isValidString2 = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
/*****************************Mobile Number Validation**************************************/
const isValidMobileNum = function (value) {
  if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value.trim())) {
    return false;
  }
  return true;
};

/*****************************Email Validation**************************************/

const isValidEmail = function (emailId) {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(emailId)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isValidId,
  isValidString1,
  isValidString2,
  isValidMobileNum,
  isValidEmail,
};
