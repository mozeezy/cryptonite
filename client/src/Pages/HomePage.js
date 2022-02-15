import React from 'react'
import Hero from '../Components/Banner/Hero'
import Coins from '../Components/Coins'
import Header from "../Components/Header";

const HomePage = () => {
  return (
    <>
      <Header className="header" />
      <Hero />
      <Coins />
    </>
  );
}

export default HomePage