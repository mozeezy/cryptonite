const express = require("express");
const app = require("../app");
const router = express.Router();
const bcrypt = require("bcryptjs");

// this module receives the destructured dbHelpers object.
module.exports = ({ addUser }, db) => {
  router.get("/logout", (req, res) => {
    res.send("Successfully logged out!");
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
    db.query(`SELECT * FROM users WHERE id= $1;`, [userID]).then((data) => {
      const loggedUser = data.rows[0];
      if (loggedUser.is_admin === true) {
        db.query(
          `SELECT * FROM users JOIN transactions on users.id = user_id ORDER BY created_at DESC;`
        )
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
  // user landing page
  router.get("/", (req, res) => {
    res.render("user_signup");
  });

  router.post("/", (req, res) => {
    const { fName, lName, email, password } = req.body;
    console.log(req.body);
    addUser(fName, lName, email, password).then((data) => {
      console.log(data);
      res.redirect(`/api/users/${data.id}`);
    });
  });

  return router;
};
