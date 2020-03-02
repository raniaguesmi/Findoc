const medecinModel=require('../models/medecinModel')
const multer = require('multer');// multer y5alini n'uplowdi taswira fl formulaire
const upload = multer({dest: __dirname + '/uploads/images'}); //les images sont sauvgarder dans le dossier courant sous le dossier uploads/images
const bcrypt = require('bcrypt')
var fs=require("fs")

/* fs cest un module dans node pas besoin de l'installé
fs : file sysyem ! cest un module qui permet le controle de saisie dans les champs de formulaire */


module.exports={

/**********************************ajout ***************************************************************/
//fonctionne
ajouter:function(req,res){
  //fonctionne sans fs
  /*le senareo de lajout des photo : tout dabort le systeme ya9ra les files mte3na w mn be3ed yenregisrtrihom ya deux cas 
kan el enregistrement est effectué avec succées alors ikml la creation dune instance de  medecin sinon il genere une erreur */
/*readfile et writefile ces sont des fonctions predefini dans le module fs file system qui controle le champs de saisie dans les formulaire  */
 
//var   file = __dirname + '/upload/' + req.files['diplome'][0].originalName;


/*fs.readFile(toString(req.files),function(err,data){
  fs.writeFile(file,data,function(err){
    
    if (err){
      console.error(err);
     /* var response = {
      message: 'Sorry, file couldn\'t be uploaded.',
      filename: req.file.originalname
    };
  }
    else {*/
     const medecin = new medecinModel ({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
        adresseCabinet:req.body.adresseCabinet,
        telephone:req.body.telephone,
        dateNaissance:req.body.dateNaissance,
        cin:req.body.cin,
        diplome:req.files['diplome'][0].originalname,
        cv:req.files['cv'][0].originalname ,
        image:req.files['image'][0].originalname}
    )
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
  /*})
})

},*/
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
    email: req.body.email,
    password: req.body.password,
    adresseCabinet:req.body.adresseCabinet,
    telephone:req.body.telephone,
    dateNaissance:req.body.dateNaissance,
    cin:req.body.cin,
    diplome:req.files['diplome'][0].originalname,
    cv:req.files['cv'][0].originalname,
    image:req.files['image'][0].originalname}
  ,function(err)
  {if(err)
    {res.json({state:'no',message:'il ya un erreur : '+err})}
    else {res.json({state:'yes',message:'la modification terminé avec succées'})}

  })
},
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

},


}