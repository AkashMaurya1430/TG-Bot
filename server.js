// Require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const logger = require("morgan");
var app = express();
const cors = require("cors");

// Set up middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "../public")));

const allowedOrigins = ["https://grifftips.com/index.php/about/", "http://localhost:8100"];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

// Enable preflight requests for all routes
app.options("*", cors(corsOptions));

// --------------ROUTES-------------------
app.get("/page1", function (req, res) {
  res.render("page1.ejs");
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
const port = 3000;
app.listen(port || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
