const secretairetModel=require('../models/secretaireModel')
const multer=require('multer')
var fs=require("fs")
const upload = multer({dest: __dirname + '/uploads/images'});
module.exports={
//fonctionne
    ajouter : function (req,res) {
        var file = __dirname + '/uploads/' + req.file.originalname;
        fs.readFile(req.file.path, function (err, data) {
          fs.writeFile(file, data, function (err) {
            if (err) {
              
              console.error(err);
              var response = {
                message: 'Sorry, file couldn\'t be uploaded.',
                filename: req.file.originalname
              };
            } else {
                const secretaire=new secretairetModel({
                  nom: req.body.nom,
                  prenom: req.body.prenom,
                  login:req.body.login,
                  password: req.body.password,
                  dateNaissance:req.body.dateNaissance,
                  adresse:req.body.adresse,
                  telephone:req.body.telephone,
                  image:req.file.originalname,
                  cin:req.body.cin,
                  email: req.body.email,

                 })
              secretaire.save(function (err) {
                if (err) {
                  res.json({state: 'no', msg: 'vous avez un erreur ' + err})
                }
                else {
                  res.json({state: 'ok', msg: 'secrétaire ajouté avec succées'})
                }
    
              })
            }
          })
        })
      },
    //fonctionne
    afficher:function(req,res){
        secretairetModel.find({},function(err,liste){
            if(err){res.json({state:'no', message:'erreur : '+err})}
            else{res.json(liste)}
          })

        },
    //ne fonctionne pas a cause de original name undefine
    modifier:function(req,res){
        secretairetModel.updateOne({_id:req.params.id},{$set:req.body},{
          nom: req.body.nom,
          prenom: req.body.prenom,
          login:req.body.login,
          password: req.body.password,
          dateNaissance:req.body.dateNaissance,
          adresse:req.body.adresse,
          telephone:req.body.telephone,
          image:req.file.originalname,
          cin:req.body.cin,
          email: req.body.email,
        },function(err)
        {
        if(err)  {res.json({state:'no',message:'il ya un erreur : '+err})}
         else {res.json({state:'yes',message:'la modification terminé avec succées'}) }
         })
},
//fonctionne
  supprimer:function (req,res) {
    secretairetModel.deleteOne({_id:req.params.id},function (err) {
      if(err)
      {
        res.json({state: 'no', msg: 'secrétaire nest pas trouvé ! lerreur :' + err})
      }
      else {
        res.json({state: 'okk', msg: 'secrétaire supprimer avec succées' })

      }

    }
  )
},

}