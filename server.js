const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const Handlebars=require("handlebars");
const { connect } = require("mongoose");
const { PORT, MONGODB_URL } = require("./config");
const app = express();

/*=================connect mongodnb database ========================*/
connect(
  MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Myntra database connection successfully connected");
  }
);

/*==========================Template engine middleware starts here====================*/
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
/*==========================Template engine middleware ends here====================*/
Handlebars.registerHelper("removeFirst6Char", (str)=>{
  let TrimValue=[...str].splice(6).join("");
  return new Handlebars.SafeString(TrimValue);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*========================server static assets======================================*/
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));

app.get('/', (req, res) => {
  res.render('./home')
})

/*===========================load ROUTES MODULE====================================*/
app.use("/profile/", require("./Routes/profiles/profile"));
app.use("/auth/", require("./Routes/auth/auth"));
app.use("/sports", require("./Routes/products/sports"));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Myntra server is running on port number " + PORT);
});