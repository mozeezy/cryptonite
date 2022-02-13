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
        db.query(
          `SELECT * FROM users JOIN transactions on users.id = user_id;`
        ).then((data) => {
          const usersTransactions = data.rows;
          const templateVars = {
            usersTransactions
          }
          res.render("admin_transactions", templateVars)
        });
      } else {
        db.query(
          `SELECT * FROM users JOIN transactions on users.id = user_id WHERE id=$1;`, [userID]
          .then((data) => {
            console.log(data)
          })
        )
      }
    });
  });

  return router;
};


/* Steps

1.) If the user is admin, then run the query to get all users and all transactions. SELECT * JOIN.
2.) Iterate through this data. 
3.) Fill a templateVars.
4.) Pass templateVars to ejs.

If the user is not admin, run a different query.

*/
