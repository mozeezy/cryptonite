const express = require("express");
const app = require("../app");
const router = express.Router();

module.exports = (dbHelpers) => {
  router.get("/new-transaction", (req, res) => {
    res.render("new_transaction");
  });

  router.post("/", (req, res) => {
    const { coins, action, dollarPrice } = req.body;
    console.log("I'M REQ.BODY >>>>", req.body);
  });
  return router;
};
