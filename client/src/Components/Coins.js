import axios from 'axios';
import { Container, createTheme, TableContainer, TextField, ThemeProvider, Typography, LinearProgress, Table, TableBody, TableRow, TableHead, TableCell, makeStyles} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi'
import { Pagination } from '@material-ui/lab';



const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#1617a",
    cursor: "pointer",
  },
  Pagination: {
    "& .MuiPaginationItem-root" : {
      color: "red",
    }
  },
}));


const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    setLoading(false)
    axios.get(CoinList(currency)).then((res) => {setCoins(res.data)})
  }, [currency, search])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

    const handleSearch = (event) => {
      setSearch(event.target.value);
    };

    const searchCoins = () => {
      return coins.filter((coin) => 
        coin.name.toLowerCase().includes(search) 
        ||
        coin.symbol.toLowerCase().includes(search)
      )
    }



  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18 }}>
          Crypto Currency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For Cryto Currencies"
          placeholder="Ethereum"
          varient="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={handleSearch}
        />

        <TableContainer>
          {loading ? (
            <>
              <LinearProgress style={{ backgroundColor: "red" }} />
              <LinearProgress style={{ backgroundColor: "white" }} />
            </>
          ) : (
            <>
              <Table>
                <TableHead style={{ backgroundColor: "red" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchCoins()
                  .slice((page - 1) * 10, ( page - 1) * 10 + 10)
                  .map((row) => {
                    return (
                      <TableRow
                        className={classes.row}
                        hover
                        key={row.name}
                        onClick={() => navigate(`coins/${row.id}`)}
                      >
                        <TableCell
                          align="left"
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{
                              marginBottom: 10,
                            }}
                          />
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
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {row.current_price.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {row.price_change_percentage_24h > 0 ? (
                            <span style={{ color: "green" }}>
                              <FiArrowUpRight />+
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              <FiArrowDown />
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </span>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {row.market_cap.toLocaleString()} M
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
        classes={{ ul: classes.Pagination}}
        count={Number((searchCoins()?.length/10).toFixed(0))}
        onChange= {(_, value) => {
          setPage(value);
          window.scroll(0, 450)
        }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default Coins