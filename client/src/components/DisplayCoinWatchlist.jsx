import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import coingeckoRequest from '../API/coingeckoRequest';
import { WatchlistContext } from "../context/WatchlistContext"


const DisplayCoinWatchlist = () => {

  const [coins, setCoins] = useState([]);
  const { watchlist } = useContext(WatchlistContext);
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
      setCoins(response.data)
    }

    fetchData()
  }, [])

  return (
    <div></div>
  )
}

export default DisplayCoinWatchlist