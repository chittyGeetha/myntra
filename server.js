const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");

const { connect } = require("mongoose");
const { PORT, MONGODB_URL } = require("./config");

const app = express();

/*---database connecting----*/

connect(
  MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("succesfully connected to database");
  }
);

/*----------Template Engine Middleware start-------*/
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

/*----------Template Engine Middleware ends-------*/

//handlebar HelperClasses
Handlebars.registerHelper("removeFirst6Char", (str) => {
  let TrimValue = [...str].splice(6).join("");
  return new Handlebars.SafeString(TrimValue);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*---------static files----------*/
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));

app.get("/", (req, res) => {
  res.render("./home");
});

/*------load router files------*/
app.use("/profile/", require("./Routes/profiles/profile"));
app.use("/profile/", require("./Routes/auth/auth"));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("myntra server is running on port number " + PORT);
});