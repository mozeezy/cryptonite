import React, { useContext } from 'react'
import { AppBar, Button, Container, Toolbar, Typography, makeStyles, createTheme, Select, MenuItem, ThemeProvider } from '@material-ui/core'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';
import { UserContext } from '../UserContext';


const useStyles = makeStyles(() => ({
  nav: {
    flex: 1, 
    fontWeight: "bold",
    },
}));

const Header = () => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState()
  const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    },
  })
  console.log(user)
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className={classes.nav}
              onClick={() => navigate("/")}
              variant="h6"
            >
              Cryto<span style={{ color: "red" }}>Nite</span>
            </Typography>
            <Button style={{ color: "red" }}>Admin</Button>
            <Button style={{ color: "red" }}>Register</Button>
            <Button style={{ color: "red" }}>Login</Button>
            <Select
              value={currency}
              onChange={handleChange}
              variant="outlined"
              styles={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"CAD"}>CAD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header