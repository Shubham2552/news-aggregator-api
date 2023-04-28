const newsRoutes = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/authJWT');
const path = require('path');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('83e7ef5d794d4b0ea5b7d55a999f6353');

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

let news;

newsRoutes.get('/', verifyToken, (req, res) => {
    if (!req.user && req.message == null) {
      res.status(403).send({
          message: "Invalid JWT token"
        });
    }
    else if (!req.user && req.message) {
      res.status(403).send({
        message: req.message
      });
    }

    newsapi.v2.everything({
      q: {...req.user[0].preferences},
      sources: 'bbc-news,the-verge',
      language: 'en',
      page: 1
    }).then(response => {
      news=JSON.parse(JSON.stringify(response));
      console.log(response);
      // news=[...response];
    });
    
    
    // newsapi.v2.topHeadlines({
  
    //   category: req.user[0].preferences[0],
    //   language: 'en',
    // })

    console.log(news);
    if(news==undefined) res.send("wait");
    res.status(200).send(news.articles);
    
  });

  module.exports=newsRoutes;