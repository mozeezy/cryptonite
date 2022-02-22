import React, { createContext, useState } from "react";

export const WatchlistContext = createContext();

export const WatchlistContextProvider = (props) => {
  console.log();
  const [watchlist, setWatchlist] = useState([
    "bitcoin",
    "ethereum",
    "ripple",
    "litecoin",
  ]);

  const deleteCoin = (coin) => {
    setWatchlist(
      watchlist.filter((element) => {
        return element !== coin;
      })
    );
  };

  const addCoin = (coin) => {
    if (watchlist.indexOf(coin) === -1) {
      setWatchlist([...watchlist, coin]);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, deleteCoin, addCoin }}>
      {props.children}
    </WatchlistContext.Provider>
  );
};
