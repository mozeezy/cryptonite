DROP TABLE IF EXISTS transactions CASCADE;

-- for the buy_or_sell column, buy is true. sell is false.
-- coin_name takes 3 entries 'Bitcoin-BTC, Litecoin-LTC, Ethereum-ETH'

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  amount DECIMAL,
  created_at TIMESTAMP,
  buy_or_sell VARCHAR(255) NOT NULL CONSTRAINT buy_sell CHECK (buy_or_sell IN ('buy', 'sell', 'reload')),
  coin_name VARCHAR(255),
  coin_amount DECIMAL,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE   
)