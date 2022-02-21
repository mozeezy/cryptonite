import React, { useState, useEffect, useReducer, useMemo } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import LandingPage from "./Pages/LandingPage";
import Register from "./Components/Register";
import { UserContext } from "./UserContext";

function App() {

    const useStyles = makeStyles(() => ({
      App: {
        backgroundColor: "#14141a",
        color: "white",
        minHeight: "100vh",
      },
    }));

    const classes = useStyles();

    const [context, setContext] = useState(null)

    const providerValue = useMemo(() => ({ context, setContext}), [context, setContext]);

  return (
    <BrowserRouter>
      <div className={classes.App}>
          <UserContext.Provider value={providerValue}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<HomePage />} />
          <Route path="home/coins/:id" element={<CoinPage />} />
        </Routes>
          </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
