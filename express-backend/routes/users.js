const express = require("express");
const app = require("../app");
const router = express.Router();
const bcrypt = require("bcryptjs");

// this module receives the destructured dbHelpers object.
module.exports = ({
  addUser,
  getUsers,
  getUserByEmail,
  getUserById,
  getAllTransactions,
  getTransactionById,
  updateBalance,
}) => {
  // user logout
  router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/api/users/register");
  });

  // user register page
  router.get("/register", (req, res) => {
    req.session = null;
    res.render("user_signup");
  });

  // get the users JSON data.
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });

  // adds balance amount
  router.get("/add-balance", (req, res) => {
    const userID = req.session.user_id;
    if (userID) {
      res.render("add_balance");
    } else {
      res
        .status(403)
        .json({ error: "You must login to access this functionality!" });
    }
  });

  router.post("/new-balance", (req, res) => {
    const { dollarAmount } = req.body;
    const userID = req.session.user_id;
    updateBalance(dollarAmount, userID)
      .then((data) => {
        res.redirect("/api/users/transactions");
      })
      .catch((err) => console.log(err));
  });

  //Logs in user.
  router.get("/login/:id", (req, res) => {
    const userID = req.params.id;
    // Confirm that the id parameter entered is a number.
    if (isNaN(userID)) {
      res.status(403).json({ error: "User doesn't exist" });
    } else {
      req.session.user_id = userID;
      res.redirect("/api/users/transactions");
    }
  });

  router.get("/transactions", (req, res) => {
    const userID = req.session.user_id;

    if (userID) {
      // Get the User.
      getUserById(userID).then((data) => {
        if (!req.session.user_id) {
        }
        const loggedUser = data;
        if (loggedUser.is_admin === true) {
          //
          getAllTransactions()
            .then((data) => {
              const usersTransactions = data;
              const templateVars = {
                usersTransactions,
              };
              res.render("admin_transactions", templateVars);
            })
            .catch((err) => console.log(err));
        } else {
          // get the transaction for each user.
          getTransactionById(userID)
            .then((data) => {
              const usersTransactions = data;
              const templateVars = {
                usersTransactions,
              };
              res.render("user_transaction", templateVars);
            })
            .catch((err) => console.log(err));
        }
      });
    } else {
      return res
        .status(403)
        .json({ err: "You must be logged in to see this page." });
    }
  });

  // redirect new user to their transactions.
  router.post("/register", (req, res) => {
    const { fName, lName, email, password } = req.body;

    // if the inputs are empty, do not prompt the user to login.
    if (!fName || !lName || !email || !password) {
      return res.status(400).send({ message: "Credentials incomplete!" });
    }
    // if the user signs in with an existing email, send a message that user exists
    getUserByEmail(email).then(async (data) => {
      if (data) {
        return res.status(400).send({ error: "User already exists!" });
      }

      // Hash the incoming password from the field before storing it in the database.
      const hashMyPassword = await bcrypt.hash(password, 10);

      // Add the user to the database.
      addUser(fName, lName, email, hashMyPassword)
        .then((data) => {
          console.log(data);
          return res.redirect(`/api/users/login/${data.id}`);
        })
        .catch((err) => console.log(err));
    });
  });

  return router;
};
