const rdvModel=require('../models/rdvModel')
var ObjectID = require("mongodb").ObjectID;

module.exports={
ajouter:function(req,res){
    rdvModel.findOne({date:req.body.date,heure:req.body.heure},function(err,reslt){
        if(reslt==null){
            const rdv=new rdvModel({
                date:req.body.date,
                heure:req.body.heure,
                medecin:req.body.medecin,
                patient:req.body.patient,
                motif:req.body.motif,
                // state
            })
            rdv.save(function(err){
                if(err){res.json({state:'no',message:'ya un erreur :'+err})}
                else{res.json({state:'ok',message:'rendez-vous ajouté avec succées'})}
            })
        }
        else{res.json({state:'no',message:'date est deja prise'})}
    })
  
},
afficher:function(req,res){
    rdvModel.find({},function(err,liste){
        if(err){res.json({state:'no', message:'ya un erreur:'+err})}
        else{res.json(liste)}
    })
},
rdvParMed:function(req,res){
    rdvModel.find({medecin:req.params.id},function(err,liste){
        if(err){res.json({state:'no', message:'ya un erreur:'+err})}
        else{res.json(liste)}
    })
} ,
afficheComplet:function(req,res){
    //  var _id=_id.$oid
    rdvModel.aggregate([
        {$lookup:{
            localField:'patient',
            from: 'utilisateurs',
            foreignField:  '_id',
            as: 'userinfo'
        }},
        { $unwind: '$userinfo' },
        { $project: {
            date: 1,
            heure: 1,
            motif:1,
            userinfo: 1,
          } }
    ],function(err,result){
        if(err){res.json({state:'no',message:'errc!!!'+err})}
        else{res.json(result) }
    });
},
//lors de test faut tout dabbord verifier si
/**Aggregation is more difficult to understand than simpler find queries and will generally run slower. However, they are powerful and an invaluable option for complex search operations */
}