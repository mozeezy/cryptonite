import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function Coin({ coin, deleteCoin }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} src={coin.image} alt={coin.name} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {coin.name}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  className={
                    coin.price_change_percentage_24h < 0 ? "red" : "green"
                  }
                >
                  {coin.price_change_percentage_24h}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {coin.id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  onClick={() => {
                    deleteCoin(coin.id);
                  }}
                  variant="body2"
                  style={{ cursor: "pointer" }}
                >
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{coin.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
