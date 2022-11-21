const collegeModel = require("../models/collegeModel");

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    let { name, fullName, logoLink } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Data not found in body" });
    }
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "name is required" });

    const find1 = await collegeModel.find({name:name});

    if (find1.length > 0) {
      return res
        .status(400)
        .send({ status: false, message: "This name is already exists" });
    }

    if (!fullName)
      return res
        .status(400)
        .send({ status: false, message: "fullName is required" });

    if (!logoLink)
      return res
        .status(400)
        .send({ status: false, message: "logoLink is required" });

    const created = await collegeModel.create(data);
    return res.status(201).send({ status: true, data: created });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createCollege = createCollege;
