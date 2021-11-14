// setup routes
const express = require("express");
const router = express.Router();

const initRoutes = (app) => {
  router.get("/", function (req, res) {
    res.send("Server Running");
  });

  router.get("/download", function (req, res) {
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
};

module.exports = initRoutes;
