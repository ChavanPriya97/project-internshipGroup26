const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const {
  isValidId,
  isValidString,
  isValidMobileNum,
  isValidEmail,
} = require("../validators/validator");

const createintern = async function (req, res) {
  try {
    let data = req.body;
    let { name, email, mobile, collegeName } = data;

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

    if (!mobile) {
      res.status(400).send({ status: true, message: "mobile is required" });
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

exports.getInterns = async (req, res) => {
  let query = req.query.collegeName;
  let filteredData = await collegeModel.findOne({ name: query });

  let collegeFullName = filteredData.fullName;
  const collegeId = filteredData._id;
  const collegeLogo = filteredData.logoLink;

  const internData = await internModel
    .find({ collegeId: collegeId })
    .select({ _id: 1, name: 1, email: 1, mobile: 1 });
  res
    .status(200)
    .send({
      status: true,
      data: {
        name: query,
        fullName: collegeFullName,
        logoLink: collegeLogo,
        interns: internData,
      },
    });
};
module.exports.createintern = createintern;
