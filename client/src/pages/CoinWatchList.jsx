import React from 'react'
import {BrowserRouter, Router} from 'react-router-dom'
import DisplayCoinWatchlist from '../components/DisplayCoinWatchlist'
import AddCoinToWatchlist from '../components/AddCoinToWatchlist'

const coinWatchlist = () => {
  return (
    <div>
      <AddCoinToWatchlist/>
     <DisplayCoinWatchlist/>
    </div>
  )
}

export default coinWatchlist