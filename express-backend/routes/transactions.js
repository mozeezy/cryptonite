const express = require("express");
const app = require("../app");
const router = express.Router();
const axios = require("axios");

module.exports = ({
  getTransactions,
  addNewTransaction,
  getUserBalance,
  updateBalance,
}) => {
  // const marketCap = (pricePerShare, numOfShares) => {
  //   return pricePerShare * numOfShares;
  // };

  const buy = (balance, amount) => {
    return balance - amount;
  };

  const sell = (balance, amount) => {
    return balance + amount;
  };

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
    const { coins, action, shares, pricePerShare } = req.body;
    const userID = req.session.user_id;
    console.log("I'M REQ.BODY >>>>", req.body);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    const price = shares * pricePerShare;

    getUserBalance(userID).then((data) => {
      console.log(data.e_wallet);
    });

    // getUserBalance(userID)
    //   .then((data) => {
    //     const price = coins * dollarPrice;
    //     if (action === "buy" && data > price) {
    //       const buyingPrice = buy(data, price);
    //       return addNewTransaction(coins, action, buyingPrice, today)
    //         .then((data) => {
    //           res.redirect(`/api/users/login/${userID}`);
    //         })
    //         .catch((err) => err);
    //     } else if (action === "sell") {
    //       const sellingPrice = sell(data, price);
    //       return addNewTransaction(coins, action, sellingPrice, today)
    //         .then((data) => {
    //           res.redirect(`/api/users/login/${userID}`);
    //         })
    //         .catch((err) => err);
    //     } else {
    //       res.json({
    //         error: "Not sufficient funds to complete the transaction.",
    //       });
    //     }
    //   })
    //   .catch((err) => console.log(err));

    // addNewTransaction(coins, action, dollarPrice, today)
    //   .then((data) => {
    //     console.log("I AM DATA >>>>>", data);
    //   })
    //   .error((err) => console.log(err));
  });
  return router;
};
