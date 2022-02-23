import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { ThemeProvider, LinearProgress, createTheme, Button } from "@material-ui/core";
import axios from "axios"

const ITEM_HEIGHT = 48;

const Order = () => {
  const { currency, symbol } = CryptoState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [coins, setCoins] = useState([]);
  const [wanted, setWanted] = useState();
  let show = false

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = (event) => {
  setWanted(event.target.value)
  setAnchorEl(null);
};




const buy = ()=> {
  axios.get(CoinList(currency)).then((res) => {
    setCoins(res.data);
    let show = true;
  });
}

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
      <Button onClick={buy}>BUy</Button>
      {show ? (<LinearProgress style={{ backgroundColor: "red" }} />
):(
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {coins.map((coin) => (
          <MenuItem
            key={coin.name}
            selected={coin === "Pyxis"}
            value={coin}
            onClick={handleClose}
          >
            {coin.name} {coin.current_price}
          </MenuItem>
        ))}
      </Menu>
    </div>
)}

    </ThemeProvider>
  );

};

export default Order;
