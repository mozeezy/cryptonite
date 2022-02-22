import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import coingeckoRequest from "../config/coingeckoRequest";
import { WatchlistContext } from "../WatchlistContext";
import Coin from "./Coin";

const DisplayCoinWatchlist = () => {
  const [coins, setCoins] = useState([]);
  const { watchlist, deleteCoin } = useContext(WatchlistContext);
  console.log(watchlist);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //this is an axios instance created with the baseurl: "https://api.coingecko.com/api/v3" named "coingeckoRequest"
      const response = await coingeckoRequest.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: watchlist.join(", "),
        },
      });
      setCoins(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [watchlist]);

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <ul>
        {coins.map((coin) => {
          return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} />;
        })}
      </ul>
    );
  };

  return <div> {renderCoins()} </div>;
};

export default DisplayCoinWatchlist;
