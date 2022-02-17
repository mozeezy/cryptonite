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

  return {
    getTransactions,
    addNewTransaction,
  };
};
