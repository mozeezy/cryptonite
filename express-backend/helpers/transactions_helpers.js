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

  const addNewTransaction = (coinName, action, dollarAmount, date) => {
    const query = {
      text: `INSERT INTO transactions (coin_name, buy_or_sell, amount, created_at) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [coinName, action, dollarAmount, date],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
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

  return {
    getTransactions,
    addNewTransaction,
    getUserBalance,
    getUserById,
    updateBalance,
  };
};
