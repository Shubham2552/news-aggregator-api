const express=require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const newsInfo = require('./routes/newsAPI');
const routes=require('express').Router();
const xss=require('xss-clean');
const { setPreferences,returnPreferences,signin,signup} = require("./controllers/authController");
var verifyToken = require('./middleware/authJWT');

require("dotenv").config();
process.on('unhandledRejection',error=>{
    console.log('unhandledRejection',error.message)});

const app=express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

routes.use(bodyParser.urlencoded({extended:false}));
routes.use(bodyParser.json());

const PORT=3000;



routes.get('/',(req,res)=>{
    res.status(200).send("Welcome to News Aggregator API");
})

routes.use('/news',xss(), newsInfo);

//Route to register user
routes.post('/register',xss(), signup);
routes.post('/signin', xss(),signin);

routes.get('/preferences',xss(), verifyToken, returnPreferences);

routes.post('/preferences', xss(), verifyToken, setPreferences);

app.listen(process.env.PORT || PORT,(error)=>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port "+PORT);
    else
        console.log("Error occured, server can't start", error);
});

module.exports=app;