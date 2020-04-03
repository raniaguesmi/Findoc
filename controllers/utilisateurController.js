const utilisateurModel=require('../models/utilisateurModel')
const jwt = require('jsonwebtoken'); // you should instal jsonwebtoken before (npm i jsonwebtoken)
const bcrypt = require('bcrypt')

module.exports={
    authentification : function (req,res) {
       /*  utilisateurModel.findOne({login:req.body.login},function (err,utilisateurinfo) {
            if (err) {
              next(err);
            }
            else {
              if (utilisateurinfo != null) {
                if (bcrypt.compare(req.body.password, utilisateurinfo.password)) {
               //   const token = jwt.sign({id: utilisateurinfo.id}, req.app.get('secretKey'), {expiresIn: '1h'})
                  res.json({status: "sucess", msg: "user found", data: {user: utilisateurinfo}, message:"vous etes un "+ utilisateurinfo.type})
    
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
          )*/
          utilisateurModel.findOne({_id:req.params.id},function(err,userinfo){
            if (err){res.json({err})}
            else{res.json({state:"ok",message:"type:"+userinfo})}
          })
      },
}