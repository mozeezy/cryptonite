import React from 'react'

const Coin = ({coin , deleteCoin}) => {


  return (
    <div>

      <ul>
        <li>
          <img src={coin.image} alt={coin.name} />

          <span> {coin.current_price} </span>

          <span onClick={(e) => {
            e.preventDefault();
            console.log(`Coin: ${coin}`)
            deleteCoin(coin.id);
          }}
          /*classname={coin.price_change_percentage_24h < 0 ?  in the red : in the green }*/ >
            {coin.price_change_percentage_24h} </span>
        </li>

      </ul>

    </div>
  )
}

export default Coin