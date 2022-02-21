import React, { useContext } from "react";
import Hero from '../Components/Banner/Hero'
import Coins from '../Components/Coins'
import Header from "../Components/Header";
import { UserContext } from "../UserContext";

const HomePage = () => {
  const { context } = useContext(UserContext);
  console.log("home", JSON.stringify(context, null, 2));

  return (
    <>
      <Header className="header" />
      <Hero />
      <Coins />
    </>
  );
}

export default HomePage