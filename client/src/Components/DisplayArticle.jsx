import React, { useEffect, useState } from "react";
import Article from "../Components/Article";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Card from "@material-ui/core/Card";

const DisplayArticle = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //this is an axios instance created with the baseurl: "https://api.coingecko.com/api/v3" named "coingeckoRequest"
      const response = await axios.get(
        "https://cryptonews-api.com/api/v1/category?section=general&items=50&token=socdthblb76bbyn0r2d72tzciiildksgzsmm5g5b"
      );
      console.log(response.data.data);
      setArticles(response.data.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  //START

  const getItems = () => {
    // if (isLoading) {
    //   return <div>Loading...</div>
    // }
    console.log();
    return articles.map((article) => {
      return <Article key={article.news_url} article={article} />;
    });
  };

  const Carousel = () => (
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
      items={getItems()}
    />
  );

  //END

  // const renderArticles = () => {

  //   if (isLoading) {
  //     return <div>Loading...</div>
  //   }
  //   return (<ul>
  //     {articles.map(article => {
  //       return <Article key={article.news_url} article={article} />
  //     })}
  //   </ul>
  //   )
  // }

  console.log(`Articles:`, articles);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{Carousel()}</div>;
};

export default DisplayArticle;
