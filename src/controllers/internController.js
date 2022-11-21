const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const createintern = async function (req, res) {
  try { 
    let data =req.body
    let {name, email, mobile,collegename}=data
const college=await collegeModel.findOne({name:collegename})
const collegId=college._id
    const interndata=await internModel.create({name:name,email:email,mobile:mobile,collegeId:collegId})
 
return res.status(201).send({status:true,data :interndata})

} catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createintern = createintern;