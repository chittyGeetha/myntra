//ROUTER LEVEL MIDDLEWARE
const express = require("express");
const router = express.Router();

//@ http method GET
//@description its AUTH get information
//@access PUBLIC
router.get("/", (req, res) => {
  res.send("i am auth router");
});

module.exports = router;