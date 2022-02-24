import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  Hero: {
    backgroundImage: "url(./cryotobanner.jpg)",
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
  }
}));

const Hero = () => {

  const classes = useStyles();

  return (
    
    <div className={classes.Hero}>
      <Container className={classes.HeroContent}>
        <div className={classes.HeroDesc}> 
          <Typography 
          variant='h2'
          style={{
            color: "red",
            fontWeight: "bold",
            marginBottom: 15.
          }}>
            CryptoNite
          </Typography>
          <Typography 
          variant='subtitle1'
          style={{
            color: "darkgray",
            textTransform: "capitalize",
          }}>
            Best place for paper trading your favorite crypto currency
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
}

export default Hero