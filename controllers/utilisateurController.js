const utilisateurModel=require('../models/utilisateurModel')
const jwt = require('jsonwebtoken'); // you should instal jsonwebtoken before (npm i jsonwebtoken)
const bcrypt = require('bcrypt')

/*Un JWT est une chaîne de caractères codée qui peut être envoyée en toute sécurité entre deux ordinateurs s'ils ont 
tous deux HTTPS. Le jeton représente une valeur accessible uniquement par l'ordinateur qui a accès à la clé secrète 
avec laquelle il a été chiffré.
À quoi cela ressemble-t-il dans la vraie vie? Supposons qu'un utilisateur souhaite se connecter à son compte. 
Ils envoient une demande avec les informations d'identification requises telles que l'e-mail et le mot de passe au 
serveur. Le serveur vérifie si les informations d'identification sont valides. S'ils le sont, le serveur crée un jeton
 en utilisant la charge utile souhaitée et une clé secrète. Cette chaîne de caractères résultant du chiffrement est 
 appelée jeton. Le serveur le renvoie ensuite au client. Le client, à son tour, enregistre le jeton pour l'utiliser 
 dans toutes les autres demandes que l'utilisateur enverra. La pratique consistant à ajouter un jeton aux en-têtes de 
 demande est un moyen d'autoriser l'utilisateur à accéder aux ressources. Ceci est un exemple pratique du
  fonctionnement de JWT.*/


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
                res.json({status: "no", message: "nom d'utilisateur est incorrect", data: null})
              }
            }
          }
          )
      },
}