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
  getUserCoins,
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

  const coinDifference = (amountFromDB, amountInput) => {
    return amountFromDB - amountInput;
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
    const { coins, action, shares } = req.body;
    const float = parseFloat(shares).toFixed(2);
    const userID = req.session.user_id;
    console.log("I'M REQ.BODY >>>>", req.body);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coins}
    `
      )
      .then((response) => {
        const pricePerShare = response.data.market_data.current_price.usd;
        const marketCap = pricePerShare * shares;
        console.log(marketCap);
        getUserBalance(userID).then((data) => {
          const eWallet = Math.round(data.e_wallet * 100) / 100;
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
          } else if (action === "sell") {
            getUserCoins(userID).then((response) => {
              const coinsArr = [];
              const coinsAmountArr = []
              for (let entry in response) {
                const userCoins = response[entry].coin_name;
                const userCoinAmount = response[entry].coin_amount;
              }
            });
            // const newBalance = sell(eWallet, marketCap);
            // updateBalance(newBalance, userID).then((data) => {
            //   addNewTransaction(
            //     coins,
            //     action,
            //     newBalance,
            //     today,
            //     float,
            //     userID
            //   ).then((data) => {
            //     return res.redirect(`/api/users/login/${userID}`);
            //   });
            //   return;
            // });
          } else {
            return res.json({ error: "Invalid Request!" });
          }
        });
      });

    // getUserBalance(userID).then((data) => {
    //   const eWallet = data.e_wallet;
    //   if (action === "buy" && eWallet > price) {
    //     const newBalance = buy(eWallet, price);
    //     updateBalance(newBalance, userID).then((data) => {
    //       addNewTransaction(coins, action, newBalance, today, userID).then(
    //         (data) => {
    //           return res.redirect(`/api/users/login/${userID}`);
    //         }
    //       );
    //       return;
    //     });
    //   } else if (action === "sell") {

    //     const newBalance = sell(eWallet, price);
    //     updateBalance(newBalance, userID).then((data) => {
    //       addNewTransaction(coins, action, newBalance, today, userID).then(
    //         (data) => {
    //           return res.redirect(`/api/users/login/${userID}`);
    //         }
    //       );
    //       return;
    //     });
    //   } else {
    //     return res.json({ error: "Invalid request" });
    //   }
    // });
  });
  return router;
};
