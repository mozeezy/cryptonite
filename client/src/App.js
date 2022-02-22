import React, { useState,  useMemo, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./App.css";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import LandingPage from "./Pages/LandingPage";
import Register from "./Components/Register";
import { UserContext } from "./UserContext";
import UseLocalStorage from "./UseLocalStorage"
import Transactions from "./Components/Transactions";
import Order from "./Components/Order";
import { WatchlistContextProvider } from "./WatchlistContext";
import ArticleList from "./Pages/ArticleList";
import ReactChatEngine from "./Pages/ReactChatEngine";
import CoinWatchlist from "./Pages/CoinWatchList";

function App() {

    const useStyles = makeStyles(() => ({
      App: {
        backgroundColor: "#14141a",
        color: "white",
        minHeight: "100vh",
      },
    }));

    const classes = useStyles();

    const [context, setContext] = UseLocalStorage("User", null)

    const providerValue = useMemo(() => ({ context, setContext}), [context, setContext]);
    
    useEffect(() => {
      localStorage.setItem("User", JSON.stringify(context))
    })

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <UserContext.Provider value={providerValue}>
          <WatchlistContextProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="register" element={<Register />} />
              <Route path="home" element={<HomePage />} />
              <Route path="chat" element={<ReactChatEngine />} />
              <Route path="watch" element={<CoinWatchlist />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="home/coins/:id" element={<CoinPage />} />
            </Routes>
          </WatchlistContextProvider>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
