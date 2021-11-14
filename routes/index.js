// setup routes
// const express = require("express");
// const router = express.Router();
const File = require("../model/File");

const initRoutes = (app) => {
  app.get("/", function (req, res) {
    res.send("Server Running");
  });

  app.get("/getfile", function (req, res) {
    let fileName = req.query.fileName;
    // console.log("File Name", fileName);
    // console.log("Previous Url", req.get("referer"));
    if (req.get("referer") && req.get("referer").includes("grifftips.com")) {
      // console.log("Yes");
      File.findOne({ fileName: fileName })
        .then((file) => {
          if (file) {
            // console.log(file);
            res.redirect(file.url);
          } else {
            res.send("File Not Found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log("No");
      backURL = req.header("Referer") || "/";
      res.redirect(backURL);
    }
  });
};

module.exports = initRoutes;
