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

  const getUserById = (id) => {
    const query = {
      text: `SELECT * FROM users WHERE id = $1`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
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

  const getAllTransactions = () => {
    const query = {
      text: `SELECT * FROM users JOIN transactions on users.id = user_id ORDER BY created_at DESC;`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getTransactionById = (id) => {
    const query = {
      text: `SELECT * FROM users JOIN transactions on users.id = user_id WHERE user_id=$1 ORDER BY created_at DESC;`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const updateBalance = (amount, userId) => {
    return getUserById(userId).then((data) => {
      const query = {
        text: `UPDATE users SET e_wallet = $1 WHERE id = $2;`,
        values: [Number(data.e_wallet) + Number(amount), userId],
      };
      return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
    });
  };
  
  const addTransaction = (amount, date, id) => {
    const query = {
      text: `INSERT into transactions (amount, created_at, buy_or_sell, user_id) VALUES ($1, $2, 'reload', $3) RETURNING *;`,
      values: [amount, date, id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .then((err) => err);
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getUserById,
    getAllTransactions,
    getTransactionById,
    updateBalance,
    addTransaction,
  };
};
