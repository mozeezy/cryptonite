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
    res.clearCookie("user_id");
    res.send("Successfully logged out!");
  });

  // user register page
  router.get("/register", (req, res) => {
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
    const userID = req.params.id;
    const session = req.session;
    if (session) {
      res.render("add_balance");
    }
  });

  router.post("/new-balance", (req, res) => {
    const { dollarAmount, userId } = req.body;
    console.log(dollarAmount);
    console.log(userId);
  });

  //Logs in user.
  router.get("/:id", (req, res) => {
    const userID = req.params.id;
    // Confirm that the id parameter entered is a number.
    if (isNaN(userID)) {
      res.status(403).json({ error: "User doesn't exist" });
    }
    // Get the User.
    getUserById(userID).then((data) => {
      const session = res.cookie("user_id", `${userID}`);
      console.log("COOKIE IS SET", session);

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
          return res.redirect(`/api/users/${data.id}`);
        })
        .catch((err) => console.log(err));
    });
  });

  return router;
};
