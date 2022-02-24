import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api';
import { useEffect } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import { Link as RouterLink } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  Carousel: {
    height: '50%',
    display: "flex", 
    alignItems: 'center',
  }
}))

const Carousel = () => {
  const [trending, setTrending] = useState([])
  const classes = useStyles();
  const { currency } = CryptoState();

  useEffect(() => {
    axios.get(TrendingCoins(currency))
    .then ((res) => { setTrending(res.data)})
  }, [currency])

  const items = trending.map((coin) => {
    return ( 
      <RouterLink className={classes.CarouselItem} to={`coins/${coin.id}`}>
        <img
        src={coin.image}
        alt={coin.name}
        height="80"
        styles={{marginBottom: 10}}
        />
      </RouterLink>
    )
  })


  const responsiveness = {
    0: {
      items: 2
    }, 
    512: {
      items: 4,
    },
  }

  return (
    <div className={classes.Carousel}>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={500}
      animationDuration={1500}
      disableButtonsControls
      disableDotsControls
      responsive={responsiveness}
      autoPlay
      items={items}/>
    </div>
  )
}

export default Carousel