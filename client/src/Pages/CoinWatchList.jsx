import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import DisplayCoinWatchlist from "../Components/DisplayCoinWatchList";
import AddCoinToWatchlist from "../Components/AddCoinToWatchList";
import { Typography } from "@material-ui/core";
import Header from "../Components/Header";

const CoinWatchlist = () => {
  return (
    <>
    <Header/>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" style={{ margin: 18 }}>
        Your WatchList
      </Typography>
      <AddCoinToWatchlist />
      <DisplayCoinWatchlist />
    </div>
    </>
  );
};

export default CoinWatchlist;
