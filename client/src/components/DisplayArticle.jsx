import React, { useEffect, useState } from 'react'
import Article from '../components/Article'
import cryptonews from '../API/cryptonews'
import axios from 'axios'

const DisplayArticle = () => {

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      //this is an axios instance created with the baseurl: "https://api.coingecko.com/api/v3" named "coingeckoRequest"
      const response = await axios.get("https://cryptonews-api.com/api/v1/category?section=general&items=50&token=socdthblb76bbyn0r2d72tzciiildksgzsmm5g5b");
      console.log(response.data.data)
      setArticles(response.data.data)
      setIsLoading(false)
    }

    fetchData()
  }, [])



  const renderArticles = () => {

    if (isLoading) {
      return <div>Loading...</div>
    }
    return (<ul>
      {articles.map(article => {
        return <Article key={article.news_url} article={article} />
      })}
    </ul>
    )
  }

  console.log(`Articles:`, articles)

  return (
    <div>{renderArticles()}</div>
  )
}

export default DisplayArticle