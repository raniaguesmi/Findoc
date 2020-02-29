const medecinModel=require('../models/medecinModel')
const multer = require('multer');// multer y5alini n'uplowdi taswira fl formulaire
const upload = multer({dest: __dirname + '/uploads/images'}); //les images sont sauvgarder dans le dossier courant sous le dossier uploads/images
const bcrypt = require('bcrypt')



module.exports={

/**********************************ajout ***************************************************************/
//fonctionne
ajouter:function(req,res){
    const medecin = new medecinModel ({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
        adresseCabinet:req.body.adresseCabinet,
        telephone:req.body.telephone,
        dateNaissance:req.body.dateNaissance,
        cin:req.body.cin,
        diplome:req.body.diplome,
        cv:req.body.cv,
        image:req.body.image,
      }
    )
    medecin.save(function (err) {
      if (err) {
        res.json({state: 'no', msg: 'vous avez un erreur ' + err})
      }
      else {
        res.json({state: 'ok', msg: 'medecin ajouté'})
      }

    })
},
/**********************************suppression ***************************************************************/

supprimer:function(req,res){
  medecinModel.deleteOne({_id:req.params.id},function(err){
    if(err)
    {res.json({state:'no', message:'erreur'})}
    else
    {res.json({state:'ok',message:'le medecin est supprimé avec succées'})}
  })

},
/**********************************affichage***************************************************************/
//fonctionne
listeMedecin:function(req,res){
  medecinModel.find({},function(err,liste){
    if(err){res.json({state:'no', message:'there is an error'})}
    else{res.json(liste)}
  })
},
/**********************************modification***************************************************************/

modifier:function(req,res){
  //{$set:req.body} cette ligne nous permet de garder les information qui nont pas ete modifier 
  medecinModel.updateOne({_id:req.params.id},{$set:req.body},{
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
    adresseCabinet:req.body.adresseCabinet,
    telephone:req.body.telephone,
    dateNaissance:req.body.dateNaissance,
    cin:req.body.cin,
    diplome:req.body.diplome,
    cv:req.body.cv,
    image:req.body.image}
  ,function(err)
  {if(err)
    {res.json({state:'no',message:'il ya un erreur : '+err})}
    else {res.json({state:'yes',message:'la modification terminé avec succées'})}

  })
},
/**********************************affichage by id ***************************************************************/
getById:function (req,res) {
  medecinModel.findOne({_id: req.params.id},function (err,Liste) {
      if (err) {
        res.json({state: 'no', msg: ' medecin nest pas trouvé' + err})
      }
      else {
        res.json(Liste)
      }
    }
  )

},


}