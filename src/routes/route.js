const express = require("express")
const collegeController = require("../controllers/collegeController")
const router = express.Router()

//Create College
router.get("/test",function(req,res){
    res.send("done")
})

router.post("/functionup/colleges",collegeController.createCollege)

module.exports = router