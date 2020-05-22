const utilisateurModel=require('../models/utilisateurModel')
const jwt = require('jsonwebtoken'); // you should instal jsonwebtoken before (npm i jsonwebtoken)
const bcrypt = require('bcrypt')

module.exports={
    authentification : function (req,res) {
         utilisateurModel.findOne({login:req.body.login},function (err,utilisateurinfo) {
            if (err)  { next(err); }
            if(req.body.login=='admin'&& req.body.password=='admin'){res.json({status: "admin"})}
            else {
              if (utilisateurinfo != null) {
                if (bcrypt.compareSync(req.body.password, utilisateurinfo.password)) {
                 const token = jwt.sign({id: utilisateurinfo.id}, req.app.get('secretKey'), {expiresIn: '86400 '})
                  res.json({status: "sucess", msg: "user found", data: {user: utilisateurinfo, token: token}})
                }
                else {
                  res.json({status: "no", message : "password incorrect", data: null})
    
                }
              }
            else
              {
                res.json({status: "no", message: "email incorrect", data: null})
              }
            }
          }
          )
      },
}