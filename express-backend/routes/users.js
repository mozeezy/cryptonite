const express = require("express");
const router = express.Router();

// this module receives the destructured dbHelpers object.
module.exports = ({ getUsers, getUserByEmail, check }) => {
  //get /api/users
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });
  router.get("/emails", (req, res) => {
    getUserByEmail("mario@nintendo.com")
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
