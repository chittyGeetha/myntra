//ROUTER LEVEL MIDDLEWARE
const express = require("express");
const router = express.Router();
const multer=require("multer");

//load Profile Schema Model;
const Profile = require("../../Model/Profile");
//load multer file
const uploadPhoto=require('../../config/multer');
var upload=multer({storage:uploadPhoto.storage});

//@ http method GET
//@description its profile get information
//@access PUBLIC
router.get("/", (req, res) => {
  res.send("i am profile router");
});

router.get("/create-profile", (req, res) => {
  res.render("./profiles/create-profile");
});
router.get("/all-profiles", (req, res) => {
  //find profile collections from database
  Profile.find({}).sort({data:'desc'}).lean().then((profile)=>{
    res.render("./profiles/all-profiles",{profile});
    
  }).catch((err)=>console.log(err));
  
});
/*========================GET USER PROFILE DETAILS ========================*/
router.get("/user-details/:id", (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .lean()
    .then((profile_detail) => {
      res.render("./profiles/user-profile", { profile_detail });
    })
    .catch((err) => console.log(err));
});
router.get("/edit-profile/:id", (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .lean()
    .then((edit_profile) => {
      res.render("./profiles/edit-profile", { edit_profile });
    })
    .catch((err) => console.log(err));
});



// @http method POST
// @description CREATE PROFILE DATA
// @access PRIVATE
router.put("/edit-profile/:id",upload.single("photo"),(req,res)=>{
  Profile.findOne({_id:req.params.id})
  .then(updateProfile=>{
    //lefthand side old value=right handside its new value
    updateProfile.photo=req.file;
    updateProfile.firstname=req.body.firstname;
    updateProfile.lastname=req.body.lastname;
    updateProfile.phone=req.body.phone;
    updateProfile.gender=req.body.gender;
    updateProfile.designation=req.body.designation;
    updateProfile.address=req.body.address;
    updateProfile.alt_address=req.body.alt_address;
    updateProfile.skills=req.body.skills;
    updateProfile.country=req.body.country;
    updateProfile.landmark=req.body.landmark;
    updateProfile.pincode=req.body.pincode;
    //update in database
    updateProfile.save()
    .then((update)=>{
      res.redirect("/profile/user-details",201,{update});
    })
    .catch((err)=>console.log(err));
  })
})

router.post("/create-profile", upload.single("photo"),(req, res) => {
  let {
    firstname,
    lastname,
    designation,
    phone,
    skills,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  } = req.body;
  let newProfile = {
    photo:req.file,
    firstname,
    lastname,
    phone,
    designation,
    skills,
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
      res.redirect("/profile/all-profiles", 201, { profile });
    })
    .catch((err) => console.log(err));
});

module.exports = router;