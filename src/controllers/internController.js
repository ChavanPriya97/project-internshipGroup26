const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const {
  isValidString,
  isValidMobileNum,
  isValidEmail,
} = require("../validators/validator");

const createintern = async function (req, res) {
  try {
    let data = req.body;
    let { name, email, mobile, collegeName } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Data not found in body" });
    }
    if (!name) {
      res.status(400).send({ status: true, message: "name is required" });
    }
    if (!isValidString(name)) {
      res.status(400).send({ status: true, message: "Invalid name" });
    }
    if (!email) {
      res.status(400).send({ status: true, message: "email is required" });
    }
    if (!isValidEmail(email)) {
      res.status(400).send({ status: true, message: "Invalid Email" });
    }
    const internsEmail = await internModel.findOne({ email: email });
    if (internsEmail) {
      return res
        .status(400)
        .send({ status: false, message: "email must be unique" });
    }
    if (!mobile) {
      res.status(400).send({ status: true, message: "mobile is required" });
    }
    if (!isValidMobileNum(mobile)) {
      return res
        .status(400)
        .send({ status: false, msg: "Not a valid mobile number" });
    }
    const internsMobile = await internModel.findOne({ mobile: mobile });
    if (internsMobile) {
      return res
        .status(400)
        .send({ status: false, message: "mobile must be unique" });
    }
    const college = await collegeModel.findOne({ name: collegeName });
    const collegId = college._id;
    const interndata = await internModel.create({
      name: name,
      email: email,
      mobile: mobile,
      collegeId: collegId,
    });

    return res.status(201).send({ status: true, data: interndata });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//..........................................................GET API..............................................................................

const getInterns = async (req, res) => {
  let name = req.query.collegeName;
  if (!name) {
    return res
      .status(400)
      .send({ status: false, message: "collegeName is required" });
  }
  let filteredData = await collegeModel.findOne({ name: name });
  if (!filteredData) {
    return res
      .status(404)
      .send({ status: false, message: "college not exists" });
  }
  const { fullName, _id, logoLink } = filteredData;
  
  const internData = await internModel
    .find({ collegeId: _id })
    .select({ _id: 1, name: 1, email: 1, mobile: 1 });

  return res.status(200).send({
    status: true,
    data: {
      name: name,
      fullName: fullName,
      logoLink: logoLink,
      interns: internData,
    },
  });
};

module.exports = { createintern, getInterns };
