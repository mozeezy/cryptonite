import React from 'react'

const Article = ({article}) => {
  return (
    <div>
    <span>{article.title}</span>
    <span>{article.text}</span>
    <span>{article.date}</span>
    <span>{article.sentiment}</span>
    </div>
  )
}

export default Article