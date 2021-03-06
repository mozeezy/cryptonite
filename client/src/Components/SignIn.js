import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
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

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "red" }} align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CrytoNite
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const { setContext } = useContext(UserContext)
  const navigate = useNavigate();

  const userCheck = (e) => {
    e.preventDefault();
    axios
    .post(`http://localhost:3001/api/users/login`, {
        email,
        password,
      }).then((result) => {
        if(result.data.first_name) {
          setUser("✅ Sucessfully Signed In! ✅");
          setContext(result.data);
        } else { 
          setUser(result.data.message);
        }
      });
  };


  return (
    <Grid
      style={{ backgroundColor: "#14141a" }}
      item
      xs={12}
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      square
    >
      <div className={classes.paper}>
        <Avatar className={classes.avatar} style={{ backgroundColor: "red" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography style={{ color: "red" }} component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} >
          <TextField
            style={{ backgroundColor: "white", borderColor: "red" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            style={{ backgroundColor: "white", borderColor: "red" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            style={{ color: "red" }}
            control={<Checkbox value="remember" style={{ color: "white" }} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={userCheck}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" style={{ color: "red" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" style={{ color: "red" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
        <h1 style={{color: "red"}}>{user}</h1>
      </div>
    </Grid>
  );
};

export default SignIn;
