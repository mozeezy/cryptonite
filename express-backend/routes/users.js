const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(cors());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   expressSession({
//     key: "userId",
//     secret: "project",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24,
//     },
//   })
// );

// this module receives the destructured dbHelpers object.
module.exports = (
  {
    addUser,
    getUsers,
    getUserByEmail,
    getUserById,
    getAllTransactions,
    getTransactionById,
  },
  db
) => {
  // user logout
  router.get("/logout", (req, res) => {
    res.send("Successfully logged out!");
  });
  // user register page
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
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

  // router.post("/login", (req, res) => {
  //   const { email, password } = req.body;
  //   db.query("SELECT password_digest FROM users WHERE email = $1", [email])
  //   .then((result) => {
  //     console.log( "result", result.rows[0].password_digest)
  //     if (bcrypt.compareSync(password, result.rows[0].password_digest))
  //       db.query(
  //         "SELECT first_name FROM users WHERE email =$1 AND password_digest = $2",
  //         [email, result.rows[0].password_digest]
  //       ).then((name) => {
  //         console.log(name.rows[0].first_name);
  //         if (name.rows[0].first_name.length > 0) {
  //           console.log("hey")
  //           res.send({ name: name.rows[0].first_name });
  //           return;
  //         } else {
  //           res.send({ message: "User Not Found" });
  //           return;
  //         }
  //       });
  //   })
  // })

  router.get("/login/:id", (req, res) => {
    const { email, password } = req.body;
    const userid = req.params.id
    
  })

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    db.query("SELECT * FROM users WHERE email = $1", [email])
    .then((result) => {
      if(result.rows.length > 0) {
        bcrypt.compare(password, result.rows[0].password_digest, (err, response) => {
          if(response) {
            console.log(result.rows[0]);
            res.send(result.rows[0])
          } else {
            res.send({ message: "Username/Password Combination is Incorrect!" });
          }
        });
      } else { 
        res.send({ message: "User Does Not Exist"})
      }
    })
  })

  return router;
};
