import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import DisplayCoinWatchlist from "../Components/DisplayCoinWatchList";
import AddCoinToWatchlist from "../Components/AddCoinToWatchList";

const CoinWatchlist = () => {
  return (
    <div>
      <AddCoinToWatchlist />
      <DisplayCoinWatchlist />
    </div>
  );
};

export default CoinWatchlist;
