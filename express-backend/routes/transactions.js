const express = require("express");
const app = require("../app");
const router = express.Router();
const axios = require("axios");

module.exports = ({ getTransactions, addNewTransaction }) => {
  // Get the transactions JSON data.
  router.get("/", (req, res) => {
    getTransactions()
      .then((transactions) => res.json(transactions))
      .catch((err) => ({ error: err.message }));
  });

  router.get("/new-transaction", (req, res) => {
    const userID = req.session.user_id;
    if (userID) {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((response) => {
          const coinsList = response.data;
          console.log(coinsList);
          const templateVars = {
            coinsList,
          };
          res.render("new_transaction", templateVars);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res
        .status(403)
        .json({ error: "You must be logged in to access this functionality" });
    }
  });

  router.post("/", (req, res) => {
    const { coins, action, dollarPrice } = req.body;
    console.log("I'M REQ.BODY >>>>", req.body);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    addNewTransaction(coins, action, dollarPrice, today).then((data) => {
      console.log("I AM DATA >>>>>", data).error((err) => console.log(err));
    });
  });
  return router;
};
