require("dotenv").config();
// Require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const logger = require("morgan");
var app = express();

// Set up middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "../public")));

// --------------ROUTES-------------------
app.get("/", function (req, res) {
  res.send("Server Running");
});

app.get("/page1", function (req, res) {
  res.render("index.ejs");
});

app.get("/page2", function (req, res) {
  res.render("page2.ejs");
});

app.get("/download", function (req, res) {
  console.log(req.get("referer"));
  if (req.get("referer") && req.get("referer").includes("grifftips.com")) {
    console.log("Yes");
    res.redirect("https://luxtestok.herokuapp.com/35/%40Movies_Lux_.mkv");
  } else {
    console.log("No");
    backURL = req.header("Referer") || "/";
    res.redirect(backURL);
  }
});

// Listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
