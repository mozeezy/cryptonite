const express = require("express");
const app = require("../app");
const router = express.Router();
const axios = require("axios");

module.exports = ({ getTransactions, addNewTransaction }) => {
  router.get("/new-transaction", (req, res) => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        const coinsList = response.data;
        const templateVars = {
          coinsList,
        };
        res.render("new_transaction", templateVars);
      })
      .catch((err) => {
        console.log(err);
      });
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
      console.log("I AM DATA >>>>>", data).error((err) => console.log(err));
    });
  });
  return router;
};
