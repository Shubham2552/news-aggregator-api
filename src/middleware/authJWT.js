const jwt = require("jsonwebtoken");
const {Users}=require('../controllers/authController')

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      if (err)  {
        req.user = undefined;
        next();
      }
      console.log("Users ",Users);
      console.log("Id ",decode.id);
      console.log(req.headers.authorization.split(' ')[0]);
      let user=Users.filter(e=>{
        if (e.id==decode.id) return e;
      })
   
      if(user.length>0){
        req.user=user;
        console.log("user inside auth "+req.user[0].id);
        next();
      }else{
        res.status(500).send({message:"Error occured"})
      }
    });
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};
module.exports = verifyToken;