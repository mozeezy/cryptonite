const express = require("express");
const app = require("../app");
const router = express.Router();

module.exports = ({ getTransactions, addNewTransaction }) => {
  router.get("/new-transaction", (req, res) => {
    res.render("new_transaction");
  });

  router.post("/", (req, res) => {
    const { coins, action, dollarPrice } = req.body;
    console.log("I'M REQ.BODY >>>>", req.body);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    console.log("today is: ", today);
    addNewTransaction(coins, action, dollarPrice, today).then((data) => {
      console.log("I AM DATA >>>>>", data);
    });
  });
  return router;
};
