import React, { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

export const WatchlistContextProvider = (props) => {
  console.log();
  const [watchlist, setWatchlist] = useState(
      "bitcoin",
      "ethereum",
      "ripple",
      "litecoin",
    
  );
  return (
    <WatchlistContext.Provider value={{ watchlist }}>
      {props.children}
    </WatchlistContext.Provider>
  );
}