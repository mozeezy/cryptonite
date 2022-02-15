const express = require("express");
const app = require("../app");
const router = express.Router();
const bcrypt = require("bcryptjs");

// this module receives the destructured dbHelpers object.
module.exports = ({ addUser, getUserByEmail, getUserById, getUsersTransactions }, db) => {
  // user logout
  router.get("/logout", (req, res) => {
    res.send("Successfully logged out!");
  });
  // user register page
  router.get("/", (req, res) => {
    res.render("user_signup");
  });
  //Logs in user.
  router.get("/:id", (req, res) => {
    const userID = req.params.id;
    console.log(userID);
    // Confirm that the id parameter entered is a number.
    if (isNaN(userID)) {
      res.status(403).json({ error: "User doesn't exist" });
    }
    // Check if user exists in the database.
    getUserById(userID).then((data) => {
      const loggedUser = data;
      if (loggedUser.is_admin === true) {

        getUsersTransactions()
          .then((data) => {
            const usersTransactions = data.rows;
            const templateVars = {
              usersTransactions,
            };
            res.render("admin_transactions", templateVars);
          })
          .catch((err) => console.log(err));
      } else {
        // get the transaction for each user.
        db.query(
          `SELECT * FROM users JOIN transactions on users.id = user_id WHERE user_id=$1 ORDER BY created_at DESC;`,
          [userID]
        )
          .then((data) => {
            const usersTransactions = data.rows;
            const templateVars = {
              usersTransactions,
            };
            res.render("user_transaction", templateVars);
          })
          .catch((err) => console.log(err));
      }
    });
  });

  // redirect new user to their transactions.
  router.post("/register", (req, res) => {
    const { fName, lName, email, password } = req.body;
    console.log(req.body);

    // if the inputs are empty, do not prompt the user to login.
    if (!fName || !lName || !email || !password) {
      return res.status(400).send({ message: "Credentials incomplete!" });
    }
    // if the user signs in with an existing email, send a message that user exists
    getUserByEmail(email)
      .then((data) => {
        if (data) {
          res.status(400).send({ error: "User already exists!" });
        }
        // Otherwise, add the user to the database and assign them an ID
        addUser(fName, lName, email, password)
          .then((data) => {
            console.log(data);
            res.redirect(`/api/users/${data.id}`);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return router;
};
