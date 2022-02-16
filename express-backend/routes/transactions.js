const express = require("express");
const app = require("../app");
const router = express.Router();

module.exports = (dbHelpers) => {
  router.get("/new-transaction", (req, res) => {
    res.render("new_transaction");
  });
  return router;
};
