import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import coingeckoRequest from '../API/coingeckoRequest';
import { WatchlistContext } from "../context/WatchlistContext";
import Coin from './Coin'


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
  }, [watchlist])

  const renderCoins = () => {

    if (isLoading) {
      return <div>Loading...</div>
  }
    return ( <ul class="coin-list-group" >
      {coins.map(coin => {
      return <Coin key={coin.id} coin={coin} />
      })}
    </ul>
    )
}

return <div> {renderCoins()} </div>
 
}

export default DisplayCoinWatchlist