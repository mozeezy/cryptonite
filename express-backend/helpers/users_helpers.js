module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users;",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const checkCurrentUser = (session, id) => {
    const query = {
      text: `SELECT * FROM users WHERE id = $1;`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => {
        const user = result.rows[0];
        return user.id === Number(session);
      })
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1;`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (firstName, lastName, email, password) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *;`,
      values: [firstName, lastName, email, password],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    checkCurrentUser,
  };
};
