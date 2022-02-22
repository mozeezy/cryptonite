import React, { useContext } from "react";
import Hero from '../Components/Banner/Hero'
import Coins from '../Components/Coins'
import Header from "../Components/Header";
import { UserContext } from "../UserContext";
import ArticleList from "./ArticleList";

const HomePage = () => {
  const { context } = useContext(UserContext);

  return (
    <>
      <Header className="header" />
      <Hero />
      <ArticleList/>
      <Coins />
    </>
  );
}

export default HomePage