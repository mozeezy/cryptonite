import React, { useState, useContext } from "react";
import { WatchlistContext } from "../WatchlistContext";
import { Button } from "@material-ui/core";

const AddCoin = () => {
  const [isActive, setIsActive] = useState(false);
  const { addCoin } = useContext(WatchlistContext);
  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];

  const handleClick = (coin) => {
    addCoin(coin);
    setIsActive(false);
  };

  return (
    <div className="dropdown">
      <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
        {availableCoins.map((el) => {
          return (
            <Button style={{color: "red"}}
              onClick={() => handleClick(el)}
              href="#"
              className="dropdown-item"
            >
              {el}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AddCoin;
