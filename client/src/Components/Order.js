import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { ThemeProvider, LinearProgress, createTheme, Button } from "@material-ui/core";
import axios from "axios"
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";



const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));


const Order = () => {
  const { currency, symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [wanted, setWanted] = useState();
  const classes = useStyles();


console.log(wanted)
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Coin" variant="outlined" />
        <TextField id="outlined-basic" label="Price" variant="outlined" />
        <TextField id="outlined-basic" label="Shares" variant="outlined" />
      </form>
    </ThemeProvider>
  );

};

export default Order;
