const patientModel=require('../models/patientModel')
const multer=require('multer')
var fs=require("fs")
var bcrypt = require ('bcrypt')

const upload = multer({dest: __dirname + '/uploads/images'});
module.exports={
//fonctionne
    ajouter : function (req,res) {
                const patient=new patientModel({
                  nom: req.body.nom,
                  prenom: req.body.prenom,
                  login:req.body.login,
                  password: req.body.password,
                  dateNaissance:req.body.dateNaissance,
                  adresse:req.body.adresse,
                  telephone:req.body.telephone,
                  cin:req.body.cin,
                 })
              patient.save(function (err) {
                if (err) {
                  res.json({state: 'no', msg: 'vous avez un erreur ' + err})
                }
                else {
                   res.send("OK");
                 // res.json({state: 'OK'})
                  //res.json([{state: 'ok', msg: 'patient ajouté avec succées'}])
                }
    
              })
            
          
        
      },
    //fonctionne
    afficher:function(req,res){
        patientModel.find({},function(err,liste){
            if(err){res.json({state:'no', message:'erreur : '+err})}
            else{res.json(liste)}
          })

        },
    modifier:function(req,res){
      var password = req.body.password
      
        req.body.password = bcrypt.hashSync(password,10)
         patientModel.updateOne({_id:req.body.id},{$set:req.body},
          {
          nom: req.body.nom,
          prenom: req.body.prenom,
          login:req.body.login,
          dateNaissance:req.body.dateNaissance,
          adresse:req.body.adresse,
          telephone:req.body.telephone,
          cin:req.body.cin,
          email: req.body.email,
        }
        ,function(err)
        {if(err)
          {res.json({state:'no',message:'il ya un erreur : '+err})
          }
         else {
              res.json({state:'yes',message:'la modification terminé avec succées'})
               }
    })
    
      // });     
     
},
//fonctionne
  supprimer:function (req,res) {
  patientModel.deleteOne({_id:req.params.id},function (err) {
      if(err)
      {
        res.json({state: 'no', msg: 'patient nest pas trouvé ! lerreur :' + err})
      }
      else {
        res.json({state: 'okk', msg: 'patient supprimer avec succées' })

      }

    }
  )
},
afficheParId:function(req,res){
  patientModel.findOne({_id:req.params.id},function(err,patient){
    if(err){res.json({state:'no',message:'il ya un erreur'+err})}
    else{res.json(patient)}
  })
}
}