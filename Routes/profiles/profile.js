//ROUTER LEVEL MIDDLEWARE
const express = require("express");
const router = express.Router();

//load Profile Schema Model;
const Profile = require("../../Model/Profile");

//@ http method GET
//@description its profile get information
//@access PUBLIC
router.get("/", (req, res) => {
  res.send("i am profile router");
});

router.get("/create-profile", (req, res) => {
  res.render("./profiles/create-profile");
});

// @http method POST
// @description CREATE PROFILE DATA
// @access PRIVATE

router.post("/create-profile", (req, res) => {
  let {
    firstname,
    lastname,
    phone,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  } = req.body;
  let newProfile = {
    firstname,
    lastname,
    phone,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  };

  new Profile(newProfile)
    .save()
    .then((profile) => {
      res.redirect("/profile", 201, { profile });
    })
    .catch((err) => console.log(err));
});

module.exports = router;