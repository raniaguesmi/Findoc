const rdvModel=require('../models/rdvModel')
module.exports={
ajouter:function(req,res){
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
}


}