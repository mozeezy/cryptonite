import React from 'react'

const Coin = (props) => {
    return ( 
    <div>
    
      <ul>
      <li>
        <img src={props.coin.image} alt={props.coin.name} />

        <span> { props.coin.current_price } </span>

        <span /*classname={props.coin.price_change_percentage_24h < 0 ?  in the red : in the green }*/ > 
        { props.coin.price_change_percentage_24h } </span>
      </li>

      </ul>

    </div>
  )
}

export default Coin