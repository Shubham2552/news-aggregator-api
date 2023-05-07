var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var verifyToken=require("../middleware/authJWT");
const validator=require('../helpers/validator');

let Users=[
    {
        id:0,
        fullName:"Shubham Bhati",
        email:"htcc58002900@gmail.com",
        password:12345678,
        preferences:["Politics","Sports","Tech"]
    }
];

var signup = (req, res) => {
  const user = {
    id:req.body.id,
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  };
  
  console.log(validator.validateUserInfo(req.body,Users).message);

  if(!(validator.validateUserInfo(req.body,Users).status)){
    res.status(500).send(validator.validateUserInfo(req.body,Users));
  }else{
    if(Users.push(user)==Users.length){
      res.status(200).send({message:"user Registered successfully"})
    }
    else{
      res.status(500).send("Error");
    }
  }


//   Users.push(user).then(data => {
//     res.status(200)
//     .send({
//         message: "User Registered successfully"
//       });
//   }).catch(err => {
//     res.status(500)
//     .send({
//       message: err
//     });
//     return;
//   });
  console.log(Users);
  
};

var signin = (req, res) => {
//   User.findOne({
//       email: req.body.email
//     })
//     .then((user) => {
//       if (!user) {
//         return res.status(404)
//           .send({
//             message: "User Not found."
//           });
//       }
//       //comparing passwords
//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );
//       // checking if password was valid and send response accordingly
//       if (!passwordIsValid) {
//         return res.status(401)
//           .send({
//             accessToken: null,
//             message: "Invalid Password!"
//           });
//       }
//       //signing token with user id
//       var token = jwt.sign({
//         id: user.id
//       }, process.env.API_SECRET, {
//         expiresIn: 86400
//       });

//       //responding to client request with user profile success message and  access token .
//       res.status(200)
//         .send({
//           user: {
//             id: user._id,
//             email: user.email,
//             fullName: user.fullName,
//           },
//           message: "Login successfull",
//           accessToken: token,
//         });
//     }).catch(err => {
//       if (err) {
//         res.status(500)
//           .send({
//             message: err
//           });
//         return;
//       }
//     });
let user=Users.filter(e=>{
    if(e.email==req.body.email) return e;
})
console.log(user);
if(user.length>0){
    var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user[0].password
    );

    if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      //signing token with user id
      var token = jwt.sign({
        id: user[0].id
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });

        //responding to client request with user profile success message and  access token .
      res.status(200)
        .send({
          user: {
            id: user[0].id,
            email: user[0].email,
            fullName: user[0].fullName,
          },
          message: "Login successfull",
          accessToken: token,
        });

}else{
    res.status(404)
    .send({
      message: "User not found"
    });
  return;
}
};

var returnPreferences=(req, res) => {
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
  res.status(200);
  res.send("Successfully fetched preferences "+req.user[0].preferences);
  
}

var setPreferences=(req, res) => {
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

  for(let i=0;i<Users.length;i++){
    if(Users[i].id==req.user[0].id) Users[i].preferences=req.body.preferences;
  }
  console.log("Users",Users);
  res.status(200);
  res.send("Successfully set preferences "+req.user[0].preferences);
  
}

module.exports = { signup,signin,Users,returnPreferences,setPreferences};
