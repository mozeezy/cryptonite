const express = require("express");
const app = require("../app");
const router = express.Router();
const axios = require("axios");
const { json } = require("express");

module.exports = ({
  getTransactions,
  addNewTransaction,
  getUserBalance,
  updateBalance,
}) => {
  const buy = (balance, amount) => {
    return balance - amount;
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
    // the inputs from the ejs form
    const { coins, action, shares } = req.body;
    const float = parseFloat(shares).toFixed(2);
    const userID = req.session.user_id;

    // function to create today's date.
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    // api request to get the price per share for each coin.
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coins}
    `
      )
      .then((response) => {
        const pricePerShare = response.data.market_data.current_price.usd;
        const marketCap = pricePerShare * shares;
        getUserBalance(userID).then((data) => {
          const eWallet = Math.round(data.e_wallet * 100) / 100;

          // if the user is buying a coin, then update the balance and create a new transaction.
          if (action === "buy" && eWallet > marketCap) {
            const newBalance = buy(eWallet, marketCap);
            updateBalance(newBalance, userID).then((data) => {
              addNewTransaction(
                coins,
                action,
                newBalance,
                today,
                float,
                userID
              ).then((data) => {
                return res.redirect(`/api/users/login/${userID}`);
              });
              return;
            });

            // if the user is selling
          } else if (action === "sell") {
            return res.json({
              error:
                "This feature is still in development! We appreciate your patience. We are not scammers.",
            });
          } else {
            return res.json({
              error: "Insufficient funds. Please reload your balance.",
            });
          }
        });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });
  return router;
};
