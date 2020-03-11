const medecinModel=require('../models/medecinModel')
const multer = require('multer');// multer y5alini n'uplowdi taswira fl formulaire

/* fs cest un module dans node pas besoin de l'installé
fs : file sysyem ! cest un module qui permet le controle de saisie dans les champs de formulaire */


module.exports={

/**********************************ajout ***************************************************************/
//fonctionne
ajouter:function(req,res){
     const medecin = new medecinModel ({
        nom: req.body.nom,
        prenom: req.body.prenom,
        login:req.body.login,
        password: req.body.password,
        dateNaissance:req.body.dateNaissance,
        adresse:req.body.adresse,
        telephone:req.body.telephone,
        image:req.files['image'][0].originalname,
        cin:req.body.cin,
        email: req.body.email,
        adresseCabinet:req.body.adresseCabinet,
        diplome:req.files['diplome'][0].originalname,
        specialite:req.body.specialite,
        cv:req.files['cv'][0].originalname,
      } )
    medecin.save(function (err) {
      if (err) {
        console.error(err);

        res.json({state: 'no', msg: 'vous avez un erreur ' + err})
      }
      else {
        res.json({state: 'ok', msg: 'medecin ajouté'})
      }

    })
},
  
/**********************************suppression ***************************************************************/
//fonctionne
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
//fonctionne mais que les files ne veulent pas se modifie
modifier:function(req,res){
  //{$set:req.body} cette ligne nous permet de garder les information qui nont pas ete modifier 
  medecinModel.updateOne({_id:req.params.id},{$set:req.body},{
    nom: req.body.nom,
    prenom: req.body.prenom,
    login:req.body.login,
    password: req.body.password,
    dateNaissance:req.body.dateNaissance,
    adresse:req.body.adresse,
    telephone:req.body.telephone,
    image:req.files['image'][0].originalname,
    cin:req.body.cin,
    email: req.body.email,
    adresseCabinet:req.body.adresseCabinet,
    diplome:req.files['diplome'][0].originalname,
    specialite:req.body.specialite,
    cv:req.files['cv'][0].originalname},
  function(err)
  {
    if(err)
    {res.json({state:'no',message:'il ya un erreur : '+err})}
    else {res.json({state:'yes',message:'la modification terminé avec succées'})}

  }
)},
/**********************************affichage by id ***************************************************************/
//fonctionne
afficheParId:function (req,res) {
  medecinModel.findOne({_id: req.params.id},function (err,Liste) {
      if (err) {
        res.json({state: 'no', msg: ' medecin nest pas trouvé' + err})
      }
      else {
        res.json(Liste)
      }
    }
  )

}


}