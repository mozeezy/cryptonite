import { makeStyles, Typography, LinearProgress } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../Components/CoinInfo";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Header from "../Components/Header";
import { UserContext } from "../UserContext";

const useStyles = makeStyles((theme) => ({
  Container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  SideBar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  Heading: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  Description: {
    width: "100%",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  MarketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const { context } = useContext(UserContext);
  console.log("coinpage", JSON.stringify(context, null, 2));


  useEffect(() => {
    axios.get(SingleCoin(id)).then((res) => {
      setCoin(res.data);
    });
  },[currency]);

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "red" }} />;

  return (
    <>
      <Header className="header" />
      <div className={classes.Container}>
        <div className={classes.SideBar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.Heading}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.Description}>
            {ReactHtmlParser(coin?.description.en.split(". ")[0])}
          </Typography>
          <div className={classes.MarketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.Heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5">{coin?.market_cap_rank}</Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.Heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5">
                {symbol}{" "}
                {coin?.market_data.current_price[
                  currency.toLowerCase()
                ].toLocaleString()}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.Heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5">
                {symbol}{" "}
                {coin?.market_data.market_cap[
                  currency.toLowerCase()
                ].toLocaleString()}{" "}
                M
              </Typography>
            </span>
          </div>
        </div>
        <CoinInfo key={coin.id} coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;
