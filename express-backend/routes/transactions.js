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
  const buy = (balance, amount) => {
    return balance - amount;
  };

  const sell = (balance, amount) => {
    return balance + amount;
  };

  const subtract = (amountInDb, amountEntered) => {
    return amountInDb - amountEntered;
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
    console.log("I'M REQ.BODY >>>>", req.body);

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
        console.log(marketCap);
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
            getUserCoins(userID).then((response2) => {
              console.log("RESPONSE", response2);
              for (let element of response2) {
                const coinName = element.coin_name;
                const coinAmount = element.coin_amount;
                console.log("COINNAME", coinName);
                console.log("COINAMOUNT", coinAmount);

                if (coinName && coinAmount >= shares) {
                  console.log("IM HERE!!!");
                  const coinDifference = subtract(coinAmount, shares);
                  const newBalance = sell(eWallet, marketCap);
                  updateBalance(newBalance, userID).then((whatever) => {
                    addNewTransaction(
                      coins,
                      action,
                      newBalance,
                      today,
                      coinDifference,
                      userID
                    ).then((okay) => {
                      return res.redirect(`/api/users/login/${userID}`);
                    });
                  });
                }
              }
            });

            // getUserCoins(userID).then((response) => {
            //   let coinsObj = {};
            //   // creating an object with user's coin name as the key and the amount as the value.
            //   for (let entry in response) {
            //     const userCoins = response[entry].coin_name;
            //     const userCoinAmount = response[entry].coin_amount;
            //     coinsObj[userCoins] = userCoinAmount;
            //   }
            //   console.log("IAM coinsOBJ", coinsObj);

            //   for (let coin in coinsObj) {
            //     console.log("IAM COIN", coinsObj[coin]);
            //     if (coin && coinsObj[coin] && eWallet > marketCap) {
            //       const newBalance = sell(eWallet, marketCap);
            //       updateBalance(newBalance, userID).then((data) => {
            //         addNewTransaction(
            //           coins,
            //           action,
            //           newBalance,
            //           today,
            //           float,
            //           userID
            //         ).then((data) => {
            //           return res.redirect(`/api/users/login/${userID}`);
            //         });
            //         return;
            //       });
            //     } else {
            //       return res.json({ error: "Invalid Request" });
            //     }
            //   }
            // });
          } else {
            return res.json({ error: "Invalid Request" });
          }
        });
      });
  });
  return router;
};

