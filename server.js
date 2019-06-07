require("dotenv").config();
require("./config/passport-strategies/local");
require("./config/passport-strategies/google-oauth");
require("./config/passport-strategies/github-oauth");
require("./config/routes/routes");
const User = require("./config/models/user");

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "dist")));

const mongoose = require("mongoose");
const passport = require("passport");

mongoose.connect(process.env["MONGODB_URI"], { useNewUrlParser: true });

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
/*
Passport JS Section
 */




app.listen(port, () => console.log('Express App Listening on ' + port.toString()));
