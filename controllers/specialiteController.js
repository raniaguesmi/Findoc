const specialiteModel=require('../models/specialiteModel')
module.exports={

ajouter:function(req,res){
specialiteModel.findOne({nom:req.body.nom},function(err,reslt){
    if(err){res.json({state: 'non', msg: 'vous avez un erreur ' + err})}
    else{
        if(reslt==null)
       { res.json({state:'oui',msg:'specialite ajouté avec succées'})
   const specialite=new specialiteModel({nom:req.body.nom})
   specialite.save(function (err) {

    if (err) {
      res.json({state: 'non', msg: 'vous avez un erreur ' + err})
   
    }
  })
    }
    else{ res.json({state:'no',msg:'Le nom du specialité existe déjà'})}
}})
},

modifier:function(req,res){
    specialiteModel.findOne({nom:req.body.nom},function(err,reslt){
        if(err){res.json({state: 'non', msg: 'vous avez un erreur ' + err})}
        else{
            if(reslt==null)
           { 
           specialiteModel.updateOne({_id:req.params.id},{nom:req.body.nom},
            function(err){
            if(err){
                res.json({state:'non' ,message:'il ya un erreur'}+err)}
            else{
               res.json({state:'ok',message:'le nom du spécialit a été mofifié avec succées'})}
        }
        )
 
        }
        else{ res.json({state:'no',msg:'Le nom du specialité existe déjà'})}
    }})








    // if(specialiteModel.findOne({nom:req.body.nom})==null){
    // specialiteModel.updateOne({_id:req.params.id},{nom:req.body.nom},
    //     function(err){
    //     if(err){
    //         res.json({state:'no' ,message:'il ya un erreur'}+err)}
    //     else{
    //        res.json({state:'ok',message:'le nom du spécialit a été mofifié avec succées'})}
    // }
    // )}
    // else{
    //     res.json({state:'no',msg:'Le nom du specialité existe déjà'})
    // }
},

afficher:function(req,res){
    specialiteModel.find({},function(err,liste){
        if(err){res.json({state:'no',message:'il ya un erreur'}+err)}
        else{res.json(liste)}
    })
},

supprimer:function(req,res){
    specialiteModel.deleteOne({_id:req.params.id},function(err){
        if(err){res.json({state:'no',message:'il ya un erreur'}+err)}
        else{res.json({state:'ok',message:'la spécialit a été supprimé avec succées'})}
    })
},
MedecinParSpecialite:function(req,res){
    var nom=req.body.nom
    specialiteModel.aggregate([
        {$match:{"nom": nom}},
        {
            "$lookup": {
              "from": "utilisateurs",
              "localField": "nom",
              "foreignField": "specialite",
              "as": "MedecinInfo"
            }
          },
          {
            "$unwind": "$MedecinInfo"
          },
          {
            "$project": {
                //lene 9otlha afichili datew motif wlinfo haka aleh hatene 9odemha 1 ataw njarbou n7otou 9odem wa7de menha 0 wnchoufou chtatine
    _id:0,
                // nom: 1,
                MedecinInfo: 1
            }
          }
   
    ],function(err,result){
        if(err){res.json({state:'no',message:'errc!!!'+err})}
        else{res.json(result) }
    })
}





}