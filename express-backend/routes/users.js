const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cookieParser());
app.use(cors());

// this module receives the destructured dbHelpers object.
module.exports = ({
  addUser,
  getUsers,
  getUserByEmail,
  getUserById,
  getAllTransactions,
  getTransactionById,
  updateBalance,
  addTransaction,
}, db) => {
  
  // get the users JSON data.
  router.get("/", (req, res) => {
    getUsers()
    .then((users) => res.json(users))
    .catch((err) => res.json({ error: err.message }));
  });
  

  router.post("/info", (req, res) => {
    const { userID} = req.body;
    db.query("SELECT e_wallet FROM users WHERE id = $1", [userID]).then((result) => {
      res.send(result);
    })
  })
  
  router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log("LOGGG", req.body);

    const hashMyPassword = (password) => {
      return bcrypt.hash(password, 10);
    };

    // Add the user to the database.
    hashMyPassword(password).then((result) => {
      addUser(firstName, lastName, email, result);
    });
  });
  
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = $1", [email]).then(
      (result) => {
        if (result.rows.length > 0) {
          bcrypt.compare(
            password,
            result.rows[0].password_digest,
            (err, response) => {
              if(err) {console.log(err)}
              if (response) {
                console.log(result.rows[0]);
                res.send(result.rows[0]);
              } else {
                res.send({
                  message: "Username/Password Combination is Incorrect!",
                });
              }
            }
          );
        } else {
          res.send({ message: "User Does Not Exist" });
        }
      }
    );
  });

  // //adds balance amount
  // router.get("/add-balance", (req, res) => {
  //   const userID = req.session.user_id;
  //   if (userID) {
  //     res.render("add_balance");
  //   } else {
  //     res
  //       .status(403)
  //       .json({ error: "You must login to access this functionality!" });
  //   }
  // });

  router.post("/new-balance", (req, res) => {
    const { balance, user } = req.body;
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    addTransaction(balance, today, user)
    .then((data) => {
        updateBalance(balance, user).then((result) => {
          return res.send(data);
        })
      })
      .catch((err) => console.log(err));
  });


  router.post("/transactions", (req, res) => {
    const { user } = req.body;
    console.log(req)
    console.log("trans", user)

    if (user) {
      // Get the User.
      getUserById(user).then((data) => {

        const loggedUser = data;
        if (loggedUser.is_admin === true) {
          getAllTransactions()
            .then((result) => {
              return res.send(result);
            })
            .catch((err) => console.log(err));
        } else {
          // get the transaction for each user.
          getTransactionById(user)
            .then((transactions) => {
              console.log("transactions", transactions)
              return res.send(transactions);
            })
            .catch((err) => console.log(err));
        }
      });
    } else {
      return res
        .status(403)
        .send({ message: "You must be logged in to see this page." });
    }
  });

  return router;
};
