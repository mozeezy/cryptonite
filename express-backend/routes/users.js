const express = require("express");
const router = express.Router();

// this module receives the destructures dbHelpers object.
module.exports = ({ getUsers }) => {
  //get /api/users
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
