const newsRoutes = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/authJWT');
const path = require('path');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('83e7ef5d794d4b0ea5b7d55a999f6353');
const validator=require("../helpers/validator");

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());
let recentUser;
let news;

newsRoutes.get('/', verifyToken, async(req, res) => {
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

    console.log("req.user.id"+req.user[0].id);
    

    if(recentUser==req.user[0].id){
      console.log("Cache Used");
      res.status(200).send(news.articles);
    }
      await newsapi.v2.everything({
        q: {...req.user[0].preferences},
        sources: 'bbc-news,the-verge',
        language: 'en',
        page: 1
      }).then(response => {
        news=JSON.parse(JSON.stringify(response));
        // console.log(response);
        // news=[...response];
      });


 
    
    
    

    // console.log(news);
    
    if(news==undefined) res.send("wait");
    recentUser=req.user[0].id;
    console.log("recentUser=req.user[0].id",recentUser,req.user[0].id);
    res.status(200).send(news.articles);
    
  });

  module.exports=newsRoutes;