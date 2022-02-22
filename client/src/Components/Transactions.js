import axios from "axios";
import {
  Container,
  createTheme,
  TableContainer,
  TextField,
  ThemeProvider,
  Typography,
  LinearProgress,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button
} from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import { UserContext } from "../UserContext";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import ButtonGroup from "@material-ui/core/ButtonGroup";




const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  row: {
    backgroundColor: "#1617a",
    cursor: "pointer",
  },
  Pagination: {
    "& .MuiPaginationItem-root": {
      color: "red",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Transactions = () => {
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(1000.00);
  const { context } = useContext(UserContext);
  const user = context.id;
  const [wallet, setWallet] = useState(balance);
  

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const addBalance = (e) => {
    setBalance(e.target.value);
    axios.post(`http://localhost:3001/api/users/new-balance`, {
      balance,
      user,
    })
    .then(()=> {
      e.preventDefault();
    axios
      .post(`http://localhost:3001/api/users/transactions`, { user })
      .then((res) => {
        setWallet(res.data[0].e_wallet)
        console.log(res.data[0].e_wallet);
        setTransactions(res.data);
        console.log(transactions[0])
        setLoading(false);
      });
    })
  };



  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel>Add Money</InputLabel>
          <Select
            value={balance}
            onChange={addBalance}
            variant="outlined"
            styles={{
              width: 100,
              height: 40,
              marginRight: 15,
            }}
          >
            <MenuItem value={1000.00}>1,000</MenuItem>
            <MenuItem value={5000.00}>5,000</MenuItem>
            <MenuItem value={10000.00}>10,000</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18 }}>
          Your Transactions
        </Typography>

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "red" }} />
          ) : (
            <>
              <Table>
                <TableHead style={{ backgroundColor: "red" }}>
                  <TableRow>
                    {[
                      "E-Wallet Balance",
                      "Coins Purhased",
                      "Amount of Coins Bought/Sold",
                      "Buy/Sell",
                      "Total",
                      "Date",
                    ].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                        }}
                        key={head}
                        align={head === "E-Wallet Balance" ? "left" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((row) => {
                    return (
                      <TableRow className={classes.row} hover key={wallet}>
                        <TableCell
                          align="left"
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {symbol} {row.e_wallet}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ textTransform: "uppercase", fontSize: 22 }}
                        >
                          {row.coin_name}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                            fontWeight: 500,
                          }}
                        >
                          {row.coin_amount}
                        </TableCell>
                        <TableCell align="right">
                          {row.buy_or_sell === "buy" ? (
                            <span
                              style={{
                                color: "red",
                                textTransform: "uppercase",
                                fontSize: 22,
                                fontWeight: 500,
                              }}
                            >
                              {row.buy_or_sell}
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "green",
                                textTransform: "uppercase",
                                fontSize: 22,
                                fontWeight: 500,
                              }}
                            >
                              {row.buy_or_sell}
                            </span>
                          )}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ textTransform: "uppercase", fontSize: 22 }}
                        >
                          {symbol} {row.amount}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ textTransform: "uppercase", fontSize: 22 }}
                        >
                          {row.created_at}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.Pagination }}
          count={Number((transactions?.length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );

};

export default Transactions;
