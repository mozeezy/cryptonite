import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import SignIn from "../Components/SignIn";
import { createTheme, ThemeProvider } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "../docs/crypto.jpg",
    backgroundColor:
    theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    color: "red",
    margin: theme.spacing(3, 0, 2),
  },
  HeroContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  HeroDesc: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });




const LandingPage = () => {
  
  const classes = useStyles();
  const navigate = useNavigate();
  const changePage = (e) => {
    e.preventDefault();
    navigate(`/home`)
  }
  
  return (
    <Grid container component="main">
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{ backgroundImage: "../docs/crypto.jpg" }}
        >
          <Container className={classes.HeroContent}>
            <div className={classes.HeroDesc}>
              <Typography
                variant="h2"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                Welcome To CryptoNite
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: "red",
                  textTransform: "capitalize",
                }}
              >
                Best place for paper trading your favorite crypto currency
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                <Button style={{ color: "red" }} onClick={changePage}>
                  Browse Coins
                </Button>
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: "white",
                  textTransform: "capitalize",
                }}
              ></Typography>
            </div>
          </Container>
        </Grid>
      </ThemeProvider>
      <SignIn />
    </Grid>
  );
};

export default LandingPage;
