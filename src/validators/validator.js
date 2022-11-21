const { default: mongoose } = require("mongoose");

/*****************************ObjectId Validation**************************************/
const isValidId = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
};

/*****************************String Validation**************************************/

const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};




module.exports = { isValidId, isValidString};
