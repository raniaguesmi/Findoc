const medecinModel=require('../models/medecinModel')
const multer = require('multer');// multer y5alini n'uplowdi taswira fl formulaire
var fs = require("fs") // y5alini naml controle de saisie 3al les champs mte3 el formulaire
var bcrypt = require ('bcrypt') //


/* fs cest un module dans node pas besoin de l'installé
fs : file sysyem ! cest un module qui permet le controle de saisie dans les champs de formulaire */


module.exports={

/**********************************ajout ***************************************************************/
//fonctionne
ajouter:function(req,res){
 
  var file = __dirname + '/uploads/' + req.file.originalname;
    fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
          if (err) {
            console.error(err);
            var response = {
              message: 'Sorry, file couldn\'t be uploaded.',
              filename: req.file.originalname
            }
          }
          else {
            const medecin = new medecinModel({
              nom: req.body.nom,
              prenom: req.body.prenom,
              login:req.body.login,
              password: req.body.password,
              dateNaissance:req.body.dateNaissance,
              adresse:req.body.adresse,
              telephone:req.body.telephone,
              cin:req.body.cin,
              email: req.body.email,
              image:req.file.originalname,
              adresseCabinet:req.body.adresseCabinet,
              specialite:req.body.specialite,
              }
            )
            medecin.save(function (err) {
              if (err) {
                res.json({state: 'non', msg: 'il ya un erreur ' + err})
              }
              else {
                res.json({state: 'ok', msg: 'medecin ajouté'})
              }

            })
          }
        }
      )
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
    cin:req.body.cin,
    email: req.body.email,
    // image:req.file.originalname,
    adresseCabinet:req.body.adresseCabinet,
    specialite:req.body.specialite},
  function(err)
  {
    if(err)
    {res.json({state:'no',message:'il ya un erreur : '+ err})}
    else {res.json({state:'yes',message:'la modification terminé avec succées'})}

  }
  // .pre("save",function (next) {
  //   this.password=bcrypt.hashSync(this.password,10);//hashSync : Store hash in password attrebute 
  //   next();

  // }) 
  // le hash de passwprd veut pas fonctionner ici en disant .pre n'est pas une fonction
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
},
affichePhoto: function (req, res) {
  res.sendFile(__dirname + '/uploads/'+ req.params.image)
  // l'utilisation de cette fonctionnalité est d'afficher la photo de medecin dans la partie front 
},
}