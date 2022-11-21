const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController");

//Create College
router.get("/test", function (req, res) {
  res.send({msg :"done"});
});

router.post("/functionup/colleges", collegeController.createCollege);
router.post("/functionup/interns", internController.createintern);
module.exports = router;