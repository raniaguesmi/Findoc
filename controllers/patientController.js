const patientModel=require('../models/patientModel')
const multer=require('multer')
var fs=require("fs")
var bcrypt = require ('bcrypt')

const upload = multer({dest: __dirname + '/uploads/images'});
module.exports={
//fonctionne
    ajouter : function (req,res) {
      patientModel.findOne({login:req.body.login},function(err,reslt){
        if(err){res.json({state: 'non', msg: 'vous avez un erreur ' + err})}
        else{
            if(reslt==null)
           {
                const patient=new patientModel({
                  nom: req.body.nom,
                  prenom: req.body.prenom,
                  login:req.body.login,
                  password: req.body.password,
                  dateNaissance:req.body.dateNaissance,
                  adresse:req.body.adresse,
                  telephone:req.body.telephone,
                  cin:req.body.cin,
                  taille:req.body.taille,
                  poids:req.body.poids,
                  groupeSanguin:req.body.groupeSanguin,
                  allergie:req.body.allergie,
                  tel1:req.body.tel1,
                  tel2:req.body.tel2,
                  traitementEncours:req.body.traitementEncours,
                  maladie:req.body.maladie
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
    
              })}
              else{ res.json({state:'no',msg:'non dutulisateur déja utulisé'})}

          
        
      }})},
    //fonctionne
    afficher:function(req,res){
        patientModel.find({},function(err,liste){
            if(err){res.json({state:'no', message:'erreur : '+err})}
            else{res.json(liste)}
          })

        },
    modifier:function(req,res){
      if(req.body.password!=null){
        var password = req.body.password     
       req.body.password = bcrypt.hashSync(password,10)
     } 
     patientModel.findOne({login:req.body.login},function(err,rslt){
      if(rslt!=null) {res.json({state:'no',msg:'non dutulisateur déja utulisé'})}
      else{
        patientModel.updateOne({_id:req.body.id},{$set:req.body},
          {
          nom: req.body.nom,
          prenom: req.body.prenom,
          login:req.body.login,
          password:req.body.password,
          dateNaissance:req.body.dateNaissance,
          adresse:req.body.adresse,
          telephone:req.body.telephone,
          cin:req.body.cin,
          taille:req.body.taille,
          poids:req.body.poids,
          groupeSanguin:req.body.groupeSanguin,
          allergie:req.body.allergie,
          tel1:req.body.tel1,
          tel2:req.body.tel2,
          traitementEncours:req.body.traitementEncours,
          maladie:req.body.maladie
        }
        ,function(err)
        {if(err)
          {res.send("NO")
          }
         else {
          res.send("OK")
        }
    })}})
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
    if(err){res.send("null")}
    else{res.json(patient)}
  })
},

verifTel:function(req,res){
  patientModel.findOne({telephone:req.body.tel},function(err,patient){
    if(err){res.send("NO")}
    else{res.send(patient)}
  })
},
nombrePatients:function(req,res){
  patientModel.count({},function(err,nb){
    if(err){res.json({state:'no', message:'there is an error'})}
    else{res.json(nb)}
  })
},



//mech shiha
PatientsDeMedcin:function(req,res){
   var id=req.params.id
  patientModel.aggregate([
    // {$match:{"medecin": id}},
    {
      "$addFields": {
        "_id": {
          "$toString": "$_id"
        }
      }
    },
    {
      "$lookup": {
        "from": "rdvs",
        "localField": "_id",
        "foreignField": "patient",
        "as": "info"
      }
    },
    
    {
      "$unwind": "$info"
    },
   {
      "$project": {
       _id:1,
         nom:1 
      }
    }
  ],function(err,result){
      if(err){res.json({state:'no',message:'errc!!!'+err})}
      else{res.json(result) }
  });
},


}