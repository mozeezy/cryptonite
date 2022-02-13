const express = require("express");
const router = express.Router();

// this module receives the destructured dbHelpers object.
module.exports = (dbHelpers, db) => {
  //get /api/users
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
        db.query(`SELECT * FROM users JOIN transactions on users.id = user_id;`)
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
          `SELECT * FROM users JOIN transactions on users.id = user_id WHERE user_id=$1;`,
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

  return router;
};

