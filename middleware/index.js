require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const logger = require("morgan");

const initMiddleware = (app) => {
  // Set up middleware
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "views")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(logger("dev"));
  app.use(express.static(path.join(__dirname, "../public")));
};

module.exports = initMiddleware;
