import React, { useEffect, useState } from "react";
import Article from "../Components/Article";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Card } from "@material-ui/core/Card";
import { Typography, LinearProgress } from "@material-ui/core";

const DisplayArticle = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //this is an axios instance created with the baseurl: "https://api.coingecko.com/api/v3" named "coingeckoRequest"
      const response = await axios.get(
        "https://cryptonews-api.com/api/v1/category?section=general&items=50&token=socdthblb76bbyn0r2d72tzciiildksgzsmm5g5b"
      );
      console.log(response.data.data);
      setArticles(response.data.data);
      setLoading(false);
    };

    fetchData();
  }, []);


  //START

  const getItems = articles.map((article) => {
      return (
      <Article key={article.news_url} article={article} />
      )
    });



  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "10px",
      paddingRight: "10px",
    }}
    >
      <Typography variant="h4" style={{ margin: 18 }}>
        Recent Crypto News
        </Typography>
      {loading ? (
      <LinearProgress style={{ backgroundColor: "red" }} />
      ):(
        <AliceCarousel
          autoPlay
          autoPlayControls
          autoPlayStrategy="none"
          autoPlayInterval={1000}
          animationDuration={1000}
          animationType="fadeout"
          infinite
          touchTracking={false}
          disableDotsControls
          disableButtonsControls
          items={getItems}
        />
        )}
        </div>
  ); 
};

export default DisplayArticle;
