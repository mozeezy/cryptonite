module.exports = (db) => {
  const getTransactions = () => {
    const query = {
      text: `SELECT * FROM transactions;`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserCoins = (id) => {
    const query = {
      text: `SELECT coin_name, coin_amount FROM users JOIN transactions on users.id = user_id WHERE user_id = $1`,
      values: [id],
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

  const addNewTransaction = (
    coinName,
    action,
    dollarAmount,
    date,
    coinAmount,
    id
  ) => {
    const query = {
      text: `INSERT INTO transactions (coin_name, buy_or_sell, amount, created_at, coin_amount, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [coinName, action, dollarAmount, date, coinAmount, id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserBalance = (id) => {
    const query = {
      text: `SELECT e_wallet FROM users WHERE id=$1`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .then((err) => err);
  };

  const updateBalance = (amount, userId) => {
    const query = {
      text: `UPDATE users SET e_wallet = $1 WHERE id = $2;`,
      values: [amount, userId],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getTransactions,
    addNewTransaction,
    getUserBalance,
    getUserById,
    updateBalance,
    getUserCoins,
  };
};
