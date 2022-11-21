const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");

//Create College
router.get("/test", function (req, res) {
  res.send({msg :"done"});
});

router.post("/functionup/colleges", collegeController.createCollege);
module.exports = router;