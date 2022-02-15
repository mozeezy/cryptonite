const express = require("express");
const app = require("../app");
const router = express.Router();

module.exports = (dbHelpers) => {
  router.get("/", (req, res) => {
    res.send("<h1>You're in the transactions route</h1>");
  });
  return router;
};
