import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import LandingPage from "./Pages/LandingPage";

function App() {
  const [users, setUsers] = useState([]);


    const useStyles = makeStyles(() => ({
      App: {
        backgroundColor: "#14141a",
        color: "white",
        minHeight: "100vh",
      },
    }));

    const classes = useStyles();

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/users",
    })
      .then((result) => {
        console.log(result.data);
        setUsers(result.data);
      })
      .catch((err) => console.log(`Error: error.message`));
  }, []);

  const userList =
    users &&
    users.map((user) => (
      <li key={user.id}>
        {user.first_name} {user.last_name} {user.email}{" "}
      </li>
    ));

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="home/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
