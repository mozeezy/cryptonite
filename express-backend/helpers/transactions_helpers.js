module.exports = (db) => {
  const getAllTransactions = () => {
    const query = {
      text: `SELECT * FROM transactions;`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };


  return {
    getAllTransactions,
  };
};
